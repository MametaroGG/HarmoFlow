<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { localeFromPath } from './locale-routing.js';
import ReleaseHighlightVisual from './ReleaseHighlightVisual.vue';
import { releases, productIntroduction, featureGuides, updateCopy } from './release-notes-data.js';

const { page } = useData();
const locale = computed(() => localeFromPath(page.value.relativePath));
const copy = computed(() => updateCopy[locale.value]);
const path = (url) => {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const prefix = locale.value === 'ja' ? '' : `/${locale.value}`;
  return withBase(`${prefix}${url}`);
};
const asset = (url) => withBase(url);
const releaseEntries = computed(() => releases.map((release) => ({
  ...release,
  text: release.content[locale.value] ?? release.content.en ?? release.content.ja,
})));
const dateLabel = (date) => date ? new Intl.DateTimeFormat(
  { ja: 'ja-JP', en: 'en-US', zh: 'zh-CN', ko: 'ko-KR' }[locale.value],
  { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
).format(new Date(`${date}T00:00:00Z`)) : '';
const embedUrl = (id) => `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`;
const changeGroups = (release) => Object.keys(copy.value.categories)
  .filter((key) => release.text.changes?.[key]?.length);
</script>

<template>
  <div class="release-notes">
    <div class="rn-container">
      <nav class="rn-breadcrumb" :aria-label="copy.home">
        <a :href="path('/')">{{ copy.home }}</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ copy.pageLabel }}</span>
      </nav>

      <header class="rn-hero">
        <div>
          <p class="rn-eyebrow"><span class="rn-status-dot" aria-hidden="true"></span>{{ copy.eyebrow }}</p>
          <h1>{{ copy.title }}<span>{{ copy.titleAccent }}</span></h1>
        </div>
        <div class="rn-hero-aside">
          <p class="rn-lead">{{ copy.lead }}</p>
          <nav class="rn-section-nav" :aria-label="copy.navLabel">
            <a href="#release-history"><span aria-hidden="true">01</span>{{ copy.historyNav }}</a>
            <a href="#introduction"><span aria-hidden="true">02</span>{{ copy.introNav }}</a>
            <a href="#features"><span aria-hidden="true">03</span>{{ copy.featuresNav }}</a>
          </nav>
        </div>
      </header>

      <section class="rn-history rn-section" aria-labelledby="release-history">
        <div class="rn-section-heading">
          <div>
            <p class="rn-eyebrow">01 / {{ copy.historyEyebrow }}</p>
            <h2 id="release-history">{{ copy.historyTitle }}</h2>
          </div>
          <p v-if="releaseEntries.length">{{ copy.historyDescription }}</p>
        </div>
        <div v-if="!releaseEntries.length" class="rn-empty-history">
          <div class="rn-history-mark" aria-hidden="true"><span></span><span></span><span></span></div>
          <div>
            <h3>{{ copy.emptyTitle }}</h3>
            <p>{{ copy.emptyDescription }}</p>
            <a class="rn-link" :href="path('/download.html')">{{ copy.download }}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <template v-else>
          <nav v-if="releaseEntries.length > 1" class="rn-archive" :aria-label="copy.archive">
            <p>{{ copy.archive }}</p>
            <a v-for="release in releaseEntries.slice(1)" :key="release.id" :href="`#release-${release.id}`">
              <strong>{{ release.version }}</strong><time v-if="release.date" :datetime="release.date">{{ dateLabel(release.date) }}</time><span aria-hidden="true">↓</span>
            </a>
          </nav>
          <article v-for="release in releaseEntries" :key="release.id" class="rn-release" :aria-labelledby="`release-${release.id}`">
            <header class="rn-release-heading">
              <div class="rn-release-meta"><span class="rn-version">{{ release.version }}</span><time v-if="release.date" :datetime="release.date">{{ dateLabel(release.date) }}</time></div>
              <h3 :id="`release-${release.id}`">{{ release.text.title }}</h3>
              <p>{{ release.text.summary }}</p>
            </header>
            <figure v-if="release.video" class="rn-release-video">
              <div class="rn-video-frame">
                <iframe v-if="release.video.youtubeId" :src="embedUrl(release.video.youtubeId)" :title="release.text.videoTitle || release.text.title" width="1280" height="720" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <video v-else-if="release.video.src" :src="asset(release.video.src)" :poster="release.video.poster ? asset(release.video.poster) : undefined" :aria-label="release.text.videoTitle || release.text.title" width="1280" height="720" controls playsinline preload="none">
                  <track v-for="track in release.video.tracks || []" :key="track.lang" :src="asset(track.src)" kind="captions" :srclang="track.lang" :label="track.label" :default="track.lang === locale" />
                </video>
              </div>
              <figcaption v-if="release.video.watchUrl"><a :href="release.video.watchUrl" target="_blank" rel="noopener noreferrer">{{ copy.watchVideo }}<span aria-hidden="true">↗</span></a></figcaption>
            </figure>
            <section v-if="release.text.highlights?.length" class="rn-release-highlights" :aria-label="copy.highlights">
              <h4>{{ copy.highlights }}</h4>
              <div class="rn-highlight-grid">
                <article v-for="highlight in release.text.highlights" :key="highlight.title" class="rn-highlight">
                  <ReleaseHighlightVisual v-if="highlight.visual" :visual="highlight.visual" />
                  <img v-else-if="highlight.image" :src="asset(highlight.image.src)" :alt="highlight.image.alt" :width="highlight.image.width" :height="highlight.image.height" :style="{ aspectRatio: `${highlight.image.width} / ${highlight.image.height}` }" loading="lazy" decoding="async" />
                  <h5>{{ highlight.title }}</h5><p>{{ highlight.description }}</p>
                  <a v-if="highlight.href" class="rn-link" :href="path(highlight.href)">{{ copy.readGuide }}<span aria-hidden="true">↗</span></a>
                </article>
              </div>
            </section>
            <section v-if="changeGroups(release).length" class="rn-changelog" :aria-label="copy.detailedChanges">
              <h4>{{ copy.detailedChanges }}</h4>
              <div v-for="category in changeGroups(release)" :key="category" class="rn-change-group">
                <h5>{{ copy.categories[category] }}</h5>
                <ul><li v-for="change in release.text.changes[category]" :key="change">{{ change }}</li></ul>
              </div>
            </section>
            <a v-if="release.sourceUrl" class="rn-link rn-release-source" :href="release.sourceUrl" target="_blank" rel="noopener noreferrer">{{ copy.releaseSource }}<span aria-hidden="true">↗</span></a>
          </article>
        </template>
      </section>

      <section class="rn-introduction rn-section" aria-labelledby="introduction">
        <div class="rn-section-heading">
          <div>
            <p class="rn-eyebrow">02 / {{ copy.introEyebrow }}</p>
            <h2 id="introduction">{{ copy.introTitle }}</h2>
          </div>
          <p>{{ copy.introDescription }}</p>
        </div>
        <figure class="rn-film">
          <div class="rn-film-bar" aria-hidden="true">
            <span class="rn-film-brand"><img :src="asset('/logo.svg')" alt="" width="24" height="24" />HarmoFlow</span>
            <span>PRODUCT FILM</span>
          </div>
          <div class="rn-video-frame">
            <iframe
              :src="embedUrl(productIntroduction.youtubeId)"
              :title="copy.introVideoTitle"
              width="1280" height="720" loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <figcaption class="rn-film-caption">
            <p>{{ copy.introNote }}</p>
            <a :href="productIntroduction.watchUrl" target="_blank" rel="noopener noreferrer">
              {{ copy.watchVideo }}<span aria-hidden="true">↗</span>
            </a>
          </figcaption>
        </figure>
      </section>

      <section class="rn-features rn-section" aria-labelledby="features">
        <div class="rn-section-heading">
          <div>
            <p class="rn-eyebrow">03 / {{ copy.featuresEyebrow }}</p>
            <h2 id="features">{{ copy.featuresTitle }}</h2>
          </div>
          <p>{{ copy.featuresDescription }}</p>
        </div>
        <div class="rn-feature-grid">
          <article v-for="feature in featureGuides" :key="feature.id" class="rn-feature-card" :class="`rn-feature-${feature.id}`">
            <figure class="rn-concept">
              <div class="rn-concept-graphic">
                <span class="rn-concept-number" aria-hidden="true">{{ feature.label }}</span>
                <svg v-if="feature.id === 'paint'" viewBox="0 0 420 236" role="img" :aria-label="copy.features.paint.alt">
                  <path d="M16 199h388M16 165h388M16 131h388M16 97h388M16 63h388M48 32v172M90 32v172M132 32v172M174 32v172M216 32v172M258 32v172M300 32v172M342 32v172M384 32v172" class="rn-diagram-grid" />
                  <path d="m55 74 61-35 61 35v77l-61 35-61-35Z" fill="#15383c" stroke="#67bcc0" />
                  <path d="m55 74 61 36 61-36M116 110v76" stroke="#67bcc0" />
                  <path d="m77 103 22 13v36l-22-13" fill="none" stroke="#84e0d2" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M198 115h30m-8-8 8 8-8 8" stroke="#b7cfd0" stroke-width="2" />
                  <g stroke="#79a2a5" fill="#173b3e">
                    <rect x="252" y="88" width="49" height="49" rx="2" /><rect x="301" y="88" width="49" height="49" rx="2" /><rect x="350" y="88" width="49" height="49" rx="2" /><rect x="301" y="39" width="49" height="49" rx="2" /><rect x="301" y="137" width="49" height="49" rx="2" />
                  </g>
                  <path d="M268 102h17v22h-17" stroke="#84e0d2" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="77" cy="103" r="10" fill="none" stroke="#effffc" stroke-width="1.5" />
                  <path d="m83 92 12-12 5 5-12 12Z" fill="#effffc" stroke="none" />
                </svg>
                <svg v-else-if="feature.id === 'layers'" viewBox="0 0 420 236" role="img" :aria-label="copy.features.layers.alt">
                  <defs><clipPath id="rn-mask-result"><circle cx="347" cy="113" r="27" /></clipPath></defs>
                  <g stroke="#d1ddda" fill="#e7eeeb">
                    <rect x="20" y="64" width="102" height="116" rx="8" /><rect x="159" y="64" width="102" height="116" rx="8" /><rect x="298" y="64" width="102" height="116" rx="8" />
                  </g>
                  <path d="M39 135c9-74 48 15 64-40" fill="none" stroke="#139e9c" stroke-width="25" stroke-linecap="round" />
                  <rect x="168" y="73" width="84" height="98" rx="4" fill="#182825" stroke="none" />
                  <circle cx="210" cy="113" r="27" fill="#fff" stroke="none" />
                  <g clip-path="url(#rn-mask-result)"><path d="M317 135c9-74 48 15 64-40" fill="none" stroke="#139e9c" stroke-width="25" stroke-linecap="round" /></g>
                  <circle cx="347" cy="113" r="27" fill="none" stroke="#5d8e85" stroke-dasharray="3 4" />
                  <path d="M131 122h18m-9-9v18M272 118h16m-16 8h16" stroke="#607b73" stroke-width="2" />
                </svg>
                <svg v-else-if="feature.id === 'weathering'" viewBox="0 0 420 236" role="img" :aria-label="copy.features.weathering.alt">
                  <g stroke="#879990" stroke-width="1.5">
                    <path d="m50 83 69-39 69 39v79l-69 39-69-39Z" fill="#d6dfd8" /><path d="m50 83 69 39 69-39M119 122v79" fill="none" />
                    <path d="m250 83 69-39 69 39v79l-69 39-69-39Z" fill="#d6dfd8" /><path d="m250 83 69 39 69-39M319 122v79" fill="none" />
                  </g>
                  <path d="m50 83 69-39 69 39-69 39Z" fill="#e7eee8" stroke="#879990" stroke-width="1.5" />
                  <path d="m250 83 69-39 69 39-69 39Z" fill="#e7eee8" stroke="#879990" stroke-width="1.5" />
                  <path d="M204 122h29m-7-7 7 7-7 7" stroke="#62766a" stroke-width="2" />
                  <path d="m255 87 64 36 64-36M319 125v68M258 81l60-33 62 34" fill="none" stroke="#3a8364" stroke-width="5" stroke-dasharray="11 5 3 6" stroke-linecap="round" />
                  <path d="m257 94 8 5m7 4 7 4m58 10 10-5m-23 27v8m0 15v7m-57-86 8-5m72-14 8 5" stroke="#719a5e" stroke-width="3" stroke-linecap="round" />
                  <circle cx="353" cy="59" r="16" fill="#f4f7f2" stroke="#aac0af" /><path d="m347 59 4 4 8-8" stroke="#326449" stroke-width="2" />
                </svg>
                <svg v-else viewBox="0 0 420 236" role="img" :aria-label="copy.features.adjustments.alt">
                  <defs>
                    <linearGradient id="rn-gray-ramp"><stop stop-color="#192322" /><stop offset="1" stop-color="#eef1ec" /></linearGradient>
                    <linearGradient id="rn-color-ramp"><stop stop-color="#14323b" /><stop offset=".45" stop-color="#279a9c" /><stop offset=".72" stop-color="#92c69a" /><stop offset="1" stop-color="#e4efc6" /></linearGradient>
                  </defs>
                  <rect x="40" y="43" width="340" height="48" rx="6" fill="url(#rn-gray-ramp)" stroke="none" />
                  <path d="M55 107v25m-5-5 5 5 5-5m70-20v25m-5-5 5 5 5-5m80-20v25m-5-5 5 5 5-5m80-20v25m-5-5 5 5 5-5m70-20v25m-5-5 5 5 5-5" stroke="#8c9d96" stroke-width="1.5" />
                  <rect x="40" y="149" width="340" height="48" rx="6" fill="url(#rn-color-ramp)" stroke="none" />
                  <g stroke="#fff" stroke-width="3"><circle cx="55" cy="173" r="7" fill="#14323b" /><circle cx="210" cy="173" r="7" fill="#279a9c" /><circle cx="365" cy="173" r="7" fill="#e4efc6" /></g>
                </svg>
              </div>
              <figcaption class="rn-diagram-labels" :class="{ 'rn-three-labels': feature.id === 'layers' }">
                <span>{{ copy.features[feature.id].first }}</span>
                <span>{{ copy.features[feature.id].second }}</span>
                <span v-if="copy.features[feature.id].third">{{ copy.features[feature.id].third }}</span>
              </figcaption>
            </figure>
            <div class="rn-feature-copy">
              <p class="rn-feature-tag">{{ copy.features[feature.id].tag }}</p>
              <h3>{{ copy.features[feature.id].title }}</h3>
              <p class="rn-feature-description">{{ copy.features[feature.id].description }}</p>
              <div class="rn-feature-links">
                <a :href="path(feature.href)">{{ copy.readGuide }}<span aria-hidden="true">↗</span></a>
                <a v-if="feature.secondaryHref" :href="path(feature.secondaryHref)">{{ copy.uvGuide }}<span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>
        </div>
        <p class="rn-concept-note">{{ copy.conceptNote }}</p>
      </section>

      <aside class="rn-update-note">
        <span class="rn-note-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 8V4h4M5 4l4 4a7 7 0 1 1-2 8" /><path d="M12 8v5l3 2" /></svg>
        </span>
        <div><h2>{{ copy.footerTitle }}</h2><p>{{ copy.footerDescription }}</p></div>
        <a :href="path('/help/start.html#update-backup')">{{ copy.updateGuide }}<span aria-hidden="true">↗</span></a>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.release-notes {
  --rn-ink: #142522;
  --rn-muted: #53655e;
  --rn-line: #dbe3de;
  --rn-teal: #176b6b;
  color: var(--rn-ink);
  background: #fff;
  font-family: 'LINE Seed JP', sans-serif;
  font-weight: 400;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
.release-notes * { box-sizing: border-box; }
.release-notes h1, .release-notes h2, .release-notes h3, .release-notes h4, .release-notes h5, .release-notes p, .release-notes figure { margin: 0; }
.release-notes h1, .release-notes h2, .release-notes h3, .release-notes h4, .release-notes h5 { color: var(--rn-ink); font-weight: 700; letter-spacing: -.025em; }
.release-notes p { line-height: 1.9; }
.release-notes a { text-decoration: none; }
.release-notes a:focus-visible { outline: 3px solid #137a82; outline-offset: 5px; border-radius: 3px; }
.release-notes a:hover { color: var(--rn-teal); }
.release-notes a span[aria-hidden='true'] { display: inline-block; margin-left: .7em; }
.rn-container { width: min(1160px, calc(100% - 64px)); margin-inline: auto; padding-bottom: 88px; }
.rn-breadcrumb { display: flex; align-items: center; gap: 14px; padding-top: 30px; font-size: 13px; color: var(--rn-muted); }
.rn-breadcrumb > span[aria-hidden] { color: #a5b4ad; }
.rn-breadcrumb a { min-height: 32px; display: inline-flex; align-items: center; }
.rn-hero { display: grid; grid-template-columns: 1.15fr 1fr; align-items: end; gap: 60px; padding: 67px 0 64px; }
.rn-eyebrow { display: flex; align-items: center; gap: 10px; color: var(--rn-teal); font-size: 12px; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.rn-status-dot { width: 7px; height: 7px; background: #168885; border-radius: 50%; box-shadow: 0 0 0 5px #eaf3ee; }
.rn-hero h1 { font-size: clamp(36px, 4.3vw, 60px); line-height: 1.4; margin-top: 20px; letter-spacing: -.045em; }
.rn-hero h1 span { display: block; }
.rn-hero-aside { padding-bottom: 6px; }
.rn-hero .rn-lead { max-width: 29em; color: var(--rn-muted); font-size: 16px; line-height: 2; text-wrap: pretty; }
.rn-section-nav { display: flex; flex-wrap: wrap; column-gap: 21px; row-gap: 5px; margin-top: 27px; border-top: 1px solid var(--rn-line); padding-top: 13px; }
.rn-section-nav a { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; font-size: 14px; font-weight: 700; }
.rn-section-nav a span[aria-hidden='true'] { color: #71857d; font-size: 10px; margin: 0; font-weight: 400; letter-spacing: .04em; }
.rn-section-heading { display: grid; grid-template-columns: 1fr .8fr; align-items: end; gap: 40px; margin-bottom: 28px; }
.rn-section-heading h2 { font-size: clamp(25px, 2.7vw, 36px); line-height: 1.55; margin-top: 9px; }
.rn-section-heading > p { font-size: 14px; color: var(--rn-muted); max-width: 34em; justify-self: end; padding-bottom: 3px; }
.rn-introduction { padding-top: 82px; }
.rn-film { overflow: hidden; border: 1px solid #23332e; border-radius: 13px; background: #0c1513; color: #eff6f0; box-shadow: 0 14px 36px #1327210b; }
.rn-film-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 58px; padding: 14px 24px; border-bottom: 1px solid #35423c; }
.rn-film-brand { display: inline-flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 700; letter-spacing: -.03em; }
.rn-film-brand img { width: 24px; height: 24px; filter: brightness(0) invert(1); }
.rn-film-bar > span:last-child { color: #b4c9bd; font-size: 10px; font-weight: 700; letter-spacing: .15em; }
.rn-video-frame { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #090e0d; overflow: hidden; }
.rn-video-frame iframe, .rn-video-frame video { position: absolute; inset: 0; display: block; width: 100%; height: 100%; border: 0; object-fit: contain; }
.rn-film-caption { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 19px 24px; border-top: 1px solid #35423c; }
.rn-film-caption p { color: #bccbc2; font-size: 14px; max-width: 54em; }
.rn-film-caption a { display: inline-flex; align-items: center; flex-shrink: 0; min-height: 44px; font-size: 14px; font-weight: 700; }
.rn-film-caption a:hover { color: #b1e8d5; }
.rn-film-caption a:focus-visible { outline-color: #92e0cf; }
.rn-features { padding-top: 88px; }
.rn-feature-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.rn-feature-card { display: flex; flex-direction: column; min-width: 0; border: 1px solid var(--rn-line); border-radius: 11px; overflow: hidden; }
.rn-concept { background: #f3f6f2; border-bottom: 1px solid var(--rn-line); }
.rn-concept-graphic { position: relative; aspect-ratio: 420 / 236; }
.rn-concept-graphic svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; fill: none; }
.rn-concept-number { position: absolute; z-index: 1; top: 18px; left: 22px; color: #778b81; font-size: 10px; letter-spacing: .08em; }
.rn-feature-paint .rn-concept { background: #102c30; border-color: #365357; }
.rn-feature-paint .rn-concept-number { color: #a9c5c3; }
.rn-diagram-grid { stroke: #436970; opacity: .27; stroke-width: .8; }
.rn-diagram-labels { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 16px; padding: 0 26px 21px; color: #526b60; font-size: 14px; line-height: 1.5; text-align: center; }
.rn-feature-paint .rn-diagram-labels { color: #c0d8d3; }
.rn-three-labels { grid-template-columns: repeat(3, 1fr); gap: 8px; }
.rn-feature-copy { display: flex; flex-direction: column; flex: 1; padding: 26px 30px 25px; }
.rn-feature-tag { color: var(--rn-teal); font-size: 11px; font-weight: 700; letter-spacing: .035em; }
.rn-feature-copy h3 { font-size: clamp(20px, 2vw, 25px); line-height: 1.55; margin-top: 9px; text-wrap: pretty; }
.rn-feature-copy .rn-feature-description { color: var(--rn-muted); font-size: 16px; margin-top: 14px; margin-bottom: 22px; line-height: 1.95; }
.rn-feature-links { display: flex; flex-wrap: wrap; gap: 4px 24px; margin-top: auto; }
.rn-feature-links a { min-height: 40px; display: inline-flex; align-items: center; font-size: 14px; font-weight: 700; }
.rn-concept-note { color: var(--rn-muted); font-size: 14px; padding-top: 17px; }
.rn-history { padding-top: 34px; border-top: 1px solid var(--rn-line); }
.rn-empty-history { display: grid; grid-template-columns: 64px 1fr; gap: 32px; align-items: center; padding: 40px 44px; background: #f5f7f3; border: 1px solid var(--rn-line); border-radius: 11px; }
.rn-history-mark { position: relative; width: 60px; height: 80px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; padding: 5px 0; }
.rn-history-mark::before { content: ''; position: absolute; inset: 9px auto 9px; width: 1px; background: #b7c7ba; }
.rn-history-mark span { position: relative; width: 9px; height: 9px; border: 1px solid #adc0b2; border-radius: 50%; background: #f5f7f3; }
.rn-history-mark span:first-child { background: #467a5d; border-color: #467a5d; box-shadow: 0 0 0 6px #e4eee0; }
.rn-empty-history h3 { font-size: 22px; line-height: 1.6; }
.rn-empty-history p { max-width: 58em; margin-top: 9px; margin-bottom: 16px; font-size: 16px; color: var(--rn-muted); }
.rn-link { display: inline-flex; align-items: center; min-height: 42px; font-size: 14px; font-weight: 700; }
.rn-update-note { display: grid; grid-template-columns: 40px 1fr auto; align-items: center; gap: 22px; margin-top: 50px; padding-top: 32px; border-top: 1px solid var(--rn-line); }
.rn-note-icon { display: flex; width: 40px; height: 40px; align-items: center; justify-content: center; background: #eff5ef; border: 1px solid #d4e2d3; border-radius: 50%; color: #447255; }
.rn-note-icon svg { width: 21px; height: 21px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.rn-update-note h2 { font-size: 16px; line-height: 1.65; }
.rn-update-note p { color: var(--rn-muted); max-width: 45em; font-size: 14px; margin-top: 4px; }
.rn-update-note > a { font-size: 14px; font-weight: 700; min-height: 44px; display: inline-flex; align-items: center; }
.rn-archive { margin-bottom: 35px; padding: 21px 25px; border: 1px solid var(--rn-line); border-radius: 9px; }
.rn-archive > p { font-size: 13px; color: var(--rn-muted); margin-bottom: 8px; }
.rn-archive a { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 18px; min-height: 46px; padding: 8px 0; border-bottom: 1px solid var(--rn-line); font-size: 13px; }
.rn-archive a:last-child { border: 0; }
.rn-archive a time { color: var(--rn-muted); font-size: 12px; }
.rn-archive a span { margin-left: auto !important; }
.rn-release { padding: 32px 0 44px; border-top: 1px solid var(--rn-line); }
.rn-release + .rn-release { margin-top: 32px; }
.rn-release-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; font-size: 12px; color: var(--rn-muted); }
.rn-version { font-weight: 700; font-size: 16px; color: var(--rn-ink); }
.rn-latest { padding: 3px 11px; border-radius: 4px; background: #e7f1e6; color: #396247; font-size: 11px; }
.rn-release-heading h3 { margin-top: 18px; font-size: clamp(25px, 3vw, 37px); line-height: 1.55; }
.rn-release-heading > p { margin-top: 15px; max-width: 58em; font-size: 15px; color: var(--rn-muted); }
.rn-release-video { margin-top: 28px !important; }
.rn-release-video .rn-video-frame { border: 1px solid #23332e; border-radius: 10px; }
.rn-release-video figcaption { display: flex; justify-content: flex-end; padding-top: 12px; font-size: 12px; }
.rn-release-video figcaption a { display: inline-flex; align-items: center; min-height: 36px; }
.rn-release-highlights, .rn-changelog { margin-top: 34px; }
.rn-release h4 { font-size: 18px; margin-bottom: 19px; }
.rn-highlight-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 26px; }
.rn-highlight { min-width: 0; }
.rn-highlight > .release-highlight-visual { margin-bottom: 21px; }
.rn-highlight > img { display: block; width: 100%; height: auto; object-fit: contain; border: 1px solid var(--rn-line); border-radius: 8px; background: #f4f6f3; margin-bottom: 16px; }
.rn-highlight h5 { font-size: 19px; line-height: 1.6; }
.rn-highlight p { font-size: 16px; color: var(--rn-muted); margin-top: 10px; }
.rn-highlight .rn-link { margin-top: 10px; }
.rn-change-group { display: grid; grid-template-columns: 150px 1fr; gap: 24px; padding: 20px 0; border-top: 1px solid var(--rn-line); }
.rn-change-group h5 { font-size: 14px; line-height: 1.85; color: var(--rn-teal); }
.rn-change-group ul { padding-left: 20px; margin: 0; color: var(--rn-muted); font-size: 14px; line-height: 1.9; }
.rn-change-group li + li { margin-top: 8px; }
.rn-release-source { margin-top: 20px; }
@media (max-width: 900px) {
  .rn-highlight-grid { grid-template-columns: 1fr; gap: 33px; }
  .rn-hero { grid-template-columns: 1fr; gap: 25px; padding-top: 46px; }
  .rn-hero .rn-lead { max-width: 42em; }
  .rn-section-nav { margin-top: 20px; }
  .rn-section-heading { gap: 26px; grid-template-columns: 1fr; }
  .rn-section-heading > p { justify-self: start; max-width: 48em; }
  .rn-feature-copy { padding: 23px; }
  .rn-update-note { grid-template-columns: 40px 1fr; }
  .rn-update-note > a { grid-column: 2; }
  .rn-film-caption { align-items: flex-start; }
}
@media (max-width: 620px) {
  .rn-container { width: calc(100% - 40px); padding-bottom: 56px; }
  .rn-breadcrumb { padding-top: 19px; font-size: 12px; }
  .rn-hero { gap: 22px; padding: 35px 0 37px; }
  .rn-hero h1 { font-size: clamp(31px, 8.1vw, 45px); line-height: 1.45; margin-top: 17px; }
  .rn-eyebrow { font-size: 10px; letter-spacing: .075em; }
  .rn-hero .rn-lead { font-size: 16px; line-height: 1.95; }
  .rn-section-nav { gap: 2px 17px; }
  .rn-section-nav a { font-size: 14px; gap: 6px; }
  .rn-introduction { padding-top: 53px; }
  .rn-section-heading { gap: 13px; margin-bottom: 22px; }
  .rn-section-heading h2 { font-size: 25px; line-height: 1.6; }
  .rn-section-heading > p { font-size: 16px; }
  .rn-film { border-radius: 9px; }
  .rn-film-bar { min-height: 48px; padding: 11px 15px; }
  .rn-film-brand { font-size: 15px; }
  .rn-film-brand img { width: 20px; height: 20px; }
  .rn-film-bar > span:last-child { font-size: 9px; }
  .rn-film-caption { flex-direction: column; gap: 5px; padding: 15px; }
  .rn-film-caption p { font-size: 14px; }
  .rn-features { padding-top: 53px; }
  .rn-history { padding-top: 27px; }
  .rn-feature-grid, .rn-highlight-grid { grid-template-columns: 1fr; gap: 20px; }
  .rn-feature-copy { padding: 22px 24px; }
  .rn-feature-copy h3 { font-size: 23px; }
  .rn-feature-copy .rn-feature-description { font-size: 16px; margin-top: 11px; margin-bottom: 16px; }
  .rn-diagram-labels { font-size: 14px; padding-bottom: 18px; }
  .rn-concept-note { font-size: 14px; }
  .rn-empty-history { padding: 27px 23px; grid-template-columns: 1fr; gap: 20px; }
  .rn-history-mark { width: 83px; height: 16px; flex-direction: row; padding: 0 5px; }
  .rn-history-mark::before { inset: 8px 9px auto; width: auto; height: 1px; }
  .rn-empty-history h3 { font-size: 20px; }
  .rn-empty-history p { font-size: 16px; }
  .rn-update-note { gap: 15px; margin-top: 32px; padding-top: 26px; grid-template-columns: 33px 1fr; }
  .rn-note-icon { width: 33px; height: 33px; align-self: start; }
  .rn-update-note h2 { font-size: 15px; }
  .rn-update-note p { font-size: 14px; }
  .rn-update-note > a { font-size: 14px; }
  .rn-release-heading > p { font-size: 16px; }
  .rn-change-group { grid-template-columns: 1fr; gap: 9px; padding: 19px 0; }
  .rn-release-meta { gap: 8px 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .release-notes *, .release-notes *::before, .release-notes *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
</style>
