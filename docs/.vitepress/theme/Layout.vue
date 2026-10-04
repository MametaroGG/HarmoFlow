<script setup>
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useData, useRoute, useRouter, withBase } from "vitepress";
import SiteIcon from "./SiteIcon.vue";
import PaintDemo from "./PaintDemo.vue";
import PaintTools from "./PaintTools.vue";
import UpdateFeatures from "./UpdateFeatures.vue";
import SystemRequirements from "./SystemRequirements.vue";
import { articles as jaArticles, categories as jaCategories } from "./help-data.js";
import { dictionaries, localizedArticles, languages } from "./locales/index.js";
import { localeFromPath, localizedPath, languagePath } from "./locale-routing.js";
const { frontmatter, page } = useData();
const route = useRoute();
const router = useRouter();
const locale = computed(() => localeFromPath(page.value.relativePath));
const t = (key) => dictionaries[locale.value]?.[key] ?? key;
const articles = computed(() => locale.value === "ja" ? jaArticles : localizedArticles[locale.value]);
const categories = computed(() => locale.value === "ja" ? jaCategories : [...new Set(articles.value.map(a => a.category))]);
const switchLanguage = (code) => router.go(withBase(languagePath(page.value.relativePath, code)));
let searchOpener = null;
const menu = ref(false),
  query = ref(""),
  modal = ref(false),
  searchInput = ref(null),
  menuToggle = ref(null);
const closeMenuOnNavigate = (event) => {
  if (event.target.closest('a[href]')) menu.value = false;
};
const animationEnabled = ref(false);
let motionMedia;
const updateMotionPreference = () => { animationEnabled.value = !motionMedia.matches; };
const graphic = (name) => href(`/graphics/${name}.${animationEnabled.value ? "svg" : "png"}`);
const layout = computed(() => frontmatter.value.layout);
const normalizeSearch = (value) => value.normalize('NFKC').toLocaleLowerCase().replace(/手ブレ/g, '手ぶれ');
const filtered = computed(() => {
  const terms = normalizeSearch(query.value)
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return articles.value.filter((a) =>
    terms.every((t) =>
      normalizeSearch(a.title + " " + a.description + " " + a.searchText)
        .includes(t),
    ),
  );
});
const currentArticle = computed(() =>
  articles.value.find((a) => route.path.includes("/help/" + a.slug)),
);
const breadcrumbCategory = computed(() =>
  currentArticle.value?.category ||
  (route.path.includes("terms") ? t("ご利用条件") : t("ユーザーガイド")),
);
const headers = computed(() =>
  (page.value.headers || []).flatMap((h) => [h, ...(h.children || [])]),
);
const articleIndex = computed(() =>
  articles.value.findIndex((a) => a.slug === currentArticle.value?.slug),
);
const href = (path) => withBase(localizedPath(path, locale.value));
const openSearch = async () => {
  if (modal.value) return;
  searchOpener = document.activeElement;
  menu.value = false;
  modal.value = true;
  await nextTick();
  searchInput.value?.focus();
};
const trapFocus = (e) => {
  const items = [...e.currentTarget.querySelectorAll("input, button, a[href]")];
  const first = items[0],
    last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};
const closeSearch = (returnFocus = true) => {
  if (!modal.value) return;
  modal.value = false;
  query.value = "";
  const opener = searchOpener;
  searchOpener = null;
  if (returnFocus) nextTick(() => {
    if (!modal.value) opener?.focus();
  });
};
const keyboard = (e) => {
  if (e.key === "Escape") {
    if (modal.value) {
      closeSearch();
    } else if (menu.value) {
      menu.value = false;
      nextTick(() => menuToggle.value?.focus());
    }
  }
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    openSearch();
  }
};
watch(
  () => route.path,
  () => {
    menu.value = false;
    query.value = "";
    closeSearch(false);
  },
);
watch(modal, (value) => {
  if (typeof document !== "undefined")
    document.body.style.overflow = value ? "hidden" : "";
});
onMounted(() => {
  document.addEventListener("keydown", keyboard);
  motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateMotionPreference();
  motionMedia.addEventListener("change", updateMotionPreference);
});
onUnmounted(() => {
  document.removeEventListener("keydown", keyboard);
  motionMedia?.removeEventListener("change", updateMotionPreference);
  document.body.style.overflow = "";
});
</script>
<template>
  <a class="skip-link" href="#main">{{ t("本文へスキップ") }}</a>
  <header class="site-header">
    <div class="nav-wrap">
      <a class="brand" :href="href('/')" :aria-label='t("HarmoFlow ホーム")'
        ><img :src="href('/logo.svg')" alt="" aria-hidden="true"
      /><span class="brand-wordmark">HarmoFlow</span></a>
      <nav :aria-label='t("メインナビゲーション")' :class="{ open: menu }" @click="closeMenuOnNavigate">
        <a :href="href('/#features')">{{ t("機能") }}</a
        ><a
          :href="href('/help')"
          :aria-current="layout === 'help' ? 'page' : undefined"
          >{{ t("ヘルプ") }}</a
        ><a :href="href('/guide')">{{ t("ユーザーガイド") }}</a
        ><a :href="href('/updates')" :aria-current="layout === 'updates' ? 'page' : undefined">{{ t("更新情報") }}</a
        ><a class="mobile-download" :href="href('/download')"
          >{{ t("購入・ダウンロード") }}</a
        >
        <button class="mobile-search" @click="openSearch">{{ t("ガイドを検索") }}</button>
      </nav>
      <div class="nav-actions">
        <label class="language-picker">
          <span class="sr-only">{{ t("言語") }}</span>
          <select :value="locale" @change="switchLanguage($event.target.value)">
            <option v-for="item in languages" :key="item.code" :value="item.code" :selected="item.code === locale">{{ item.label }}</option>
          </select>
          <SiteIcon name="chevron-right" class="language-chevron" />
        </label>
        <button
          class="search-trigger"
          @click="openSearch"
          :aria-label='t("ガイドを検索")'
        >
          <SiteIcon name="search" /><span>{{ t("検索") }}</span><kbd>Ctrl K</kbd></button
        ><a class="button nav-cta" :href="href('/download')"
          >{{ t("購入・ダウンロード") }}</a
        ><button
          ref="menuToggle"
          class="menu-toggle"
          :aria-expanded="menu"
          :aria-label='t("メニュー")'
          @click="menu = !menu"
        >
          <SiteIcon :name="menu ? 'x' : 'menu'" />
        </button>
      </div>
    </div>
  </header>
  <main id="main">
    <template v-if="layout === 'home'">
      <section class="hero" :class="'locale-' + locale">
        <div class="hero-glow"></div>
        <div class="hero-art" :class="{ 'is-paused': !animationEnabled }" aria-hidden="true">
          <div class="hero-surface-grid"></div>
          <img class="hero-mesh-left" :src="href('/graphics/hero-left-mesh.svg')" alt="" width="640" height="720" />
          <img class="hero-paint-right" :src="href('/graphics/hero-right-paint.svg')" alt="" width="640" height="720" />
        </div>
        <div class="hero-copy">
          <p class="windows-badge"><SiteIcon name="monitor" /> {{ t("Windows専用") }}</p>
          <h1><span class="hero-title-line">{{ t("3Dモデルに直接") }}<span class="hero-title-punctuation">{{ t("、") }}</span></span><span class="hero-title-line hero-title-accent">{{ t("テクスチャを描く") }}<span class="hero-title-punctuation">{{ t("。") }}</span></span></h1>
          <p class="hero-description">
            <span>{{ t("トゥーン表現から、物理ベースの質感まで。") }}</span><span>{{ t("NPR・PBRに対応した、Windows専用の3Dペイントソフト。") }}</span>
          </p>
          <div class="rendering-modes" :aria-label='t("対応する表現")'><span>NPR <small>{{ t("トゥーン表現") }}</small></span><span>PBR <small>{{ t("物理ベースの質感") }}</small></span></div>
          <div class="button-row">
            <a class="button primary" :href="href('/download')"
              >{{ t("購入・ダウンロード") }}</a
            ><a class="button secondary" :href="href('/help/start')"
              >{{ t("使い方を見る") }}</a
            >
          </div>
          <p class="hero-note">
            <SiteIcon name="monitor" class="windows-icon" /> {{ t("Windows専用 · Vulkan 1.2対応GPUが必要") }}
          </p>
        </div>
        <div class="hero-launch-video" role="group" :aria-label="t('HarmoFlow ローンチビデオ')">
          <div class="launch-video-frame">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/x3csgJasBKg?si=dQy3UtQ5mmITG1EL" :title="t('HarmoFlow ローンチビデオ')" loading="eager" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <a class="launch-video-link" href="https://www.youtube.com/watch?v=x3csgJasBKg" target="_blank" rel="noopener noreferrer">{{ t("YouTubeで見る") }}</a>
        </div>
        <div class="hero-product">
          <PaintDemo :active="animationEnabled" :t="t" @pause="animationEnabled = false" @play="animationEnabled = true" />
          <div class="product-caption">
            <span>{{ t("同じモデルで、NPRとPBRの仕上がりを比較") }}</span>
            <button class="button secondary animation-control" :aria-pressed="!animationEnabled" @click="animationEnabled = !animationEnabled">{{ animationEnabled ? t("動きを止める") : t("動きを再生") }}</button>
          </div>
        </div>
      </section>
      <div class="feature-strip">
        <span>{{ t("3D & UV ペイント") }}</span><span>{{ t("レイヤー & マスク") }}</span
        ><span>NPR & PBR</span><span>{{ t("パス & スタンプ") }}</span>
      </div>
      <section id="features" class="section intro-section">
        <p class="eyebrow">FEATURES</p>
        <h2>{{ t("テクスチャ制作に必要な機能。") }}</h2>
        <p class="section-lead">
          {{ t("3DとUVの両方で描画し、レイヤーとマスクで調整。") }}<br />{{ t("NPR・PBRのプレビューで、色と質感を確認しながら仕上げられます。") }}
        </p>
        <div class="feature-large">
          <div class="feature-text">
            <span class="feature-number">01 / PAINT</span>
            <h3>{{ t("3DとUV、") }}<br />{{ t("どちらでもペイント。") }}</h3>
            <p>
              {{ t("3DビューとUVエディタで、ブラシによる描画と消しゴムによる修正ができます。") }}
            </p>
            <p>
              {{ t("色・法線・粗さなど、複数のPBRチャンネルを一度に描画できます。") }}
            </p>
            <a class="text-link" :href="href('/help/brush')"
              >{{ t("ブラシとペイントについて") }}</a
            >
          </div>
          <div class="feature-visual lavender">
            <img
              :src="href('/graphics/model-movie/pbr-worn-poster.webp')"
              :alt='t("立体モデルの表面に色と質感を描くイメージ")'
              loading="lazy"
            /><span class="visual-label">SURFACE PAINTING</span>
          </div>
        </div>
        <div class="feature-large reverse">
          <div class="feature-text">
            <span class="feature-number">02 / LAYERS</span>
            <h3>{{ t("レイヤーとマスクで、") }}<br />{{ t("仕上がりを調整。") }}</h3>
            <p>
              {{ t("ペイント、Fill、パス、調整のレイヤーに対応。ペイント・Fill・調整レイヤーでは、マスクで適用範囲を指定できます。不透明度や合成方法も調整できます。") }}
            </p>
            <p>
              {{ t("色や模様、質感をレイヤーごとに分けて、あとから編集できます。") }}
            </p>
            <a class="text-link" :href="href('/help/layers')"
              >{{ t("レイヤーとマスクについて") }}</a
            >
          </div>
          <div class="feature-visual peach">
            <img
              :src="graphic('layers')"
              :alt='t("ペイント・マスク・質感のレイヤーを重ねるイメージ")'
              loading="lazy"
            /><span class="visual-label">LAYERS & MASKS</span>
          </div>
        </div>
        <UpdateFeatures :locale="locale" />
      </section>
      <PaintTools :active="animationEnabled" :t="t" @play="animationEnabled = true" />
      <section class="tools-section">
        <div class="section">
          <p class="eyebrow">EDITING TOOLS</p>
          <h2>{{ t("パス・スタンプ・メッシュマップ。") }}</h2>
          <div class="tool-grid">
            <a class="tool-card" :href="href('/help/paths')"
              ><div class="tool-image">
                <img
                  :src="graphic('paths')"
                  :alt='t("アンカーとハンドルで曲線を編集するベジェパスのイメージ")'
                  loading="lazy"
                />
              </div>
              <div>
                <span class="card-kicker">PATH</span>
                <h3>{{ t("ベジェパスの編集") }}</h3>
                <p>
                  {{ t("モデル表面のベジェパスで線や塗りを作成。アンカーはあとから編集できます。") }}
                </p>
              </div></a
            ><a class="tool-card" :href="href('/help/stamps')"
              ><div class="tool-image">
                <img
                  :src="graphic('stamps')"
                  :alt='t("文字と図形のスタンプをモデル表面へ配置するイメージ")'
                  loading="lazy"
                />
              </div>
              <div>
                <span class="card-kicker">STAMP</span>
                <h3>{{ t("画像・文字・図形スタンプ") }}</h3>
                <p>
                  {{ t("画像、テキスト、図形をスタンプとして配置。サイズや角度も調整できます。") }}
                </p>
              </div></a
            ><a class="tool-card" :href="href('/help/mesh-maps')"
              ><div class="tool-image">
                <img
                  :src="graphic('mesh-maps')"
                  :alt='t("同じ形状から曲率・AO・法線マップを作るイメージ")'
                  loading="lazy"
                />
              </div>
              <div>
                <span class="card-kicker">MESH MAPS</span>
                <h3>{{ t("メッシュマップのベイク") }}</h3>
                <p>
                  {{ t("曲率・AO・法線・位置をベイクして、形状に沿った汚し表現へつなげます。") }}
                </p>
              </div></a
            >
          </div>
          <p class="image-disclaimer">
            {{ t("機能の説明用グラフィックです。実際の操作画面とは異なります。") }}
          </p>
        </div>
      </section>
      <section class="section export-section">
        <div>
          <p class="eyebrow">EXPORT</p>
          <h2>{{ t("用途に合わせて、") }}<br />{{ t("テクスチャを書き出し。") }}</h2>
          <p>
            {{ t("PNG・JPG・TGA・EXRの画像形式と、") }}<br />{{ t("レイヤー付きPSDへの書き出しに対応しています。") }}
          </p>
          <div class="format-tags">
            <span>PNG</span><span>JPG</span><span>TGA</span><span>EXR</span
            ><span>PSD</span>
          </div>
          <a class="text-link" :href="href('/help/export')"
            >{{ t("書き出し方法と対応範囲") }}</a
          >
        </div>
        <div class="export-image">
          <img
            :src="graphic('export')"
            :alt='t("制作したテクスチャを画像形式ごとに書き出すイメージ")'
            loading="lazy"
          />
        </div>
      </section>
      <section class="start-banner">
        <p class="eyebrow">DOWNLOAD</p>
        <h2>{{ t("HarmoFlowをダウンロード。") }}</h2>
        <p>{{ t("製品の詳細・価格・配布内容はBOOTHでご確認いただけます。") }}</p>
        <a class="button primary" :href="href('/download')"
          >{{ t("購入・ダウンロード") }}</a
        >
      </section>
    </template>
    <template v-else-if="layout === 'help'">
      <section class="help-shell">
        <div class="help-heading">
          <p class="eyebrow">HELP CENTER</p>
          <h1>{{ t("どんなことをお探しですか？") }}</h1>
          <p>{{ t("導入手順、各機能の使い方、トラブル時の対処方法を確認できます。") }}</p>
          <label class="help-search"
            ><SiteIcon name="search" /><input
              v-model="query"
              type="search"
              :placeholder='t("キーワードを検索（例：ブラシ、保存、UV）")'
              :aria-label='t("ヘルプを検索")'
          /></label>
          <p v-if="query" class="search-count" aria-live="polite">
            {{ filtered.length }} {{ t("件のガイドが見つかりました") }}
          </p>
        </div>
        <div class="help-categories">
          <section
            v-for="(category, i) in categories"
            :key="category"
            v-show="filtered.some((a) => a.category === category)"
            class="help-category"
          >
            <h2>
              <span>{{ String(i + 1).padStart(2, "0") }}</span
              >{{ category }}
            </h2>
            <div class="category-links">
              <a
                v-for="article in filtered.filter(
                  (a) => a.category === category,
                )"
                :key="article.slug"
                :href="href('/help/' + article.slug)"
                ><span class="category-link-title">{{ article.title }}</span
                ><SiteIcon name="chevron-right" class="category-link-icon" /></a
              >
            </div>
          </section>
          <div v-if="!filtered.length" class="empty-search">
            <h2>{{ t("該当するガイドがありません") }}</h2>
            <p>{{ t("短い言葉や、別のキーワードでお試しください。") }}</p>
            <button class="button secondary" @click="query = ''">
              {{ t("検索をクリア") }}
            </button>
          </div>
        </div>
        <div class="help-contact">
          <h2>{{ t("ガイドで解決しないときは") }}</h2>
          <p>
            {{ t("ご利用のバージョンや操作内容を添えて、販売元へお問い合わせください。") }}
          </p>
          <a
            class="text-link"
            href="https://mametarovv.booth.pm/"
            target="_blank"
            rel="noopener noreferrer"
            >{{ t("豆々庵のBOOTHショップへ") }}</a
          >
        </div>
      </section>
    </template>
    <template v-else-if="layout === 'download'"
      ><section class="download-page section">
        <p class="eyebrow">DOWNLOAD</p>
        <h1>{{ t("購入・ダウンロード") }}</h1>
        <p class="section-lead">{{ t("NPR・PBR対応のWindows専用3Dペイントソフト") }}</p>
        <div class="download-card">
          <SiteIcon name="monitor" class="download-icon" />
          <div>
            <h2>HarmoFlow for Windows</h2>
            <p>{{ t("Vulkan 1.2対応のGPUとドライバーが必要です。") }}</p>
            <p>
              {{ t("価格・販売条件・配布ファイルの最新情報は、") }}<br />{{ t("BOOTHの商品ページをご確認ください。") }}
            </p>
            <a
              class="button primary"
              href="https://mametarovv.booth.pm/items/8754692"
              target="_blank"
              rel="noopener noreferrer"
              >{{ t("BOOTHで購入・ダウンロード") }}</a
            >
          </div>
        </div>
        <nav class="download-jump-links" :aria-label="t('購入・導入の案内')">
          <a href="#purchase-faq">{{ t("購入前FAQ") }}</a>
          <a href="#requirements-title">{{ t("動作環境") }}</a>
          <a :href="href('/help/start') + '#app-install'">{{ t("インストール・更新手順") }}</a>
        </nav>
        <SystemRequirements :t="t" />
        <div class="download-guidance">
          <div>
            <h3>{{ t("はじめてご利用の方へ") }}</h3>
            <p>
              {{ t("インストール、初回起動、更新前のバックアップから制作までをご案内します。") }}
            </p>
            <a class="text-link" :href="href('/help/start')"
              >{{ t("はじめるガイド") }}</a
            >
          </div>
          <div>
            <h3>{{ t("ご購入前に") }}</h3>
            <p>
              {{ t("ご利用条件は、HarmoFlowのソフトウェア使用許諾契約をご確認ください。") }}
            </p>
            <a class="text-link" :href="href('/terms')">{{ t("使用許諾契約を読む") }}</a>
          </div>
        </div>
        <Content class="prose purchase-faq" />
      </section></template
    >
    <template v-else-if="layout === 'updates'"><Content /></template>
    <template v-else-if="page.isNotFound"
      ><section class="section not-found">
        <p class="eyebrow">404</p>
        <h1>{{ t("ページが見つかりません") }}</h1>
        <p>{{ t("ヘルプセンターから必要な情報をお探しください。") }}</p>
        <a class="button primary" :href="href('/help')">{{ t("ヘルプへ戻る") }}</a>
      </section></template
    >
    <template v-else
      ><div class="article-shell">
        <div class="breadcrumbs">
          <a :href="href('/help')">{{ t("ヘルプ") }}</a>
          <template v-if="breadcrumbCategory !== page.title">
            <span class="breadcrumb-divider" aria-hidden="true">/</span><span>{{ breadcrumbCategory }}</span>
          </template>
          <span class="breadcrumb-divider" aria-hidden="true">/</span><span aria-current="page">{{ page.title }}</span>
        </div>
        <div class="article-grid">
          <aside class="article-toc">
            <p>{{ t("このページの内容") }}</p>
            <nav :aria-label='t("ページ内目次")'>
              <a
                v-for="heading in headers"
                :key="heading.slug"
                :href="'#' + heading.slug"
                >{{ heading.title }}</a
              >
            </nav>
            <a class="back-help" :href="href('/help')"> {{ t("ヘルプ一覧へ") }}</a>
          </aside>
          <article class="article-content">
            <p v-if="currentArticle" class="article-category">
              {{ currentArticle.category }} / USER GUIDE
            </p>
            <Content class="prose" />
            <div v-if="currentArticle" class="article-end">
              <span>{{ t("ガイドの終わり") }}</span>
            </div>
            <div v-if="currentArticle" class="article-pagination">
              <a
                v-if="articleIndex > 0"
                :href="href('/help/' + articles[articleIndex - 1].slug)"
                ><small>{{ t("前のガイド") }}</small>
                {{ articles[articleIndex - 1].title }}</a
              ><a
                v-if="articleIndex < articles.length - 1"
                :href="href('/help/' + articles[articleIndex + 1].slug)"
                ><small>{{ t("次のガイド") }}</small
                >{{ articles[articleIndex + 1].title }}</a
              >
            </div>
          </article>
        </div>
      </div></template
    >
  </main>
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" :href="href('/')"
          ><img :src="href('/logo.svg')" alt="" aria-hidden="true"
        /><span class="brand-wordmark">HarmoFlow</span></a>
        <p>{{ t("3Dテクスチャ・マテリアル制作ソフト") }}</p>
        <span>3D TEXTURE PAINTING SOFTWARE</span>
      </div>
      <div>
        <h2>{{ t("プロダクト") }}</h2>
        <a :href="href('/#features')">{{ t("機能") }}</a
        ><a :href="href('/download')">{{ t("購入・ダウンロード") }}</a
        ><a
          href="https://mametarovv.booth.pm/items/8754692"
          target="_blank"
          rel="noopener noreferrer"
          >{{ t("BOOTH商品ページ") }}</a
        >
      </div>
      <div>
        <h2>{{ t("サポート") }}</h2>
        <a :href="href('/help')">{{ t("ヘルプセンター") }}</a
        ><a :href="href('/guide')">{{ t("ユーザーガイド") }}</a
        ><a :href="href('/updates')">{{ t("更新情報") }}</a
        ><a
          href="https://mametarovv.booth.pm/"
          target="_blank"
          rel="noopener noreferrer"
          >{{ t("お問い合わせ（BOOTH）") }}</a
        >
      </div>
      <div>
        <h2>{{ t("ご利用条件") }}</h2>
        <a :href="href('/terms')">{{ t("ソフトウェア使用許諾契約") }}</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>{{ t("© 2026 豆々庵. All rights reserved.") }}</span>
    </div>
  </footer>
  <div v-if="modal" class="search-overlay" @click.self="closeSearch">
    <section
      class="search-dialog"
      role="dialog"
      aria-modal="true"
      :aria-label='t("ガイド検索")'
      @keydown.tab="trapFocus"
    >
      <div class="dialog-search">
        <input
          ref="searchInput"
          v-model="query"
          type="search"
          :placeholder='t("ガイドを検索")'
          :aria-label='t("検索キーワード")'
        /><button @click="closeSearch">{{ t("閉じる") }} <kbd>ESC</kbd></button>
      </div>
      <div class="dialog-results">
        <p class="search-count" aria-live="polite">
          {{ filtered.length }} {{ t("件のガイド") }}
        </p>
        <a
          v-for="article in filtered"
          :key="article.slug"
          :href="href('/help/' + article.slug)"
          @click="closeSearch(false)"
          ><small>{{ article.category }}</small
          ><strong>{{ article.title }}</strong>
          <p>{{ article.description }}</p></a
        >
        <p v-if="!filtered.length">
          {{ t("該当する結果がありません。別のキーワードをお試しください。") }}
        </p>
      </div>
    </section>
  </div>
</template>
