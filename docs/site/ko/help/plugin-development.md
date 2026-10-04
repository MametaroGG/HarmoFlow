---
title: "플러그인 만들기"
category: "설정과 참고 자료"
description: "Lua 확장 최소 예제부터 패널 등록, Undo, DLL SDK 구조, 빌드와 동작 확인까지 알아봅니다."
outline: [2, 3]
prev: false
next: false
---

# 플러그인 만들기 {#plugin-development}

처음에는 **버튼을 누르면 레이어를 하나 추가하는 Lua 패널**을 만들어 보세요. 파일 만들기·등록·실행·확인을 짧은 과정으로 경험할 수 있습니다. 이미지의 각 픽셀을 처리하는 필터에는 DLL을 사용합니다. 설치만 하려면 [플러그인 설치 및 관리](./plugins.md)를 참고하세요.

<GuideFlow kind="plugin-authoring" />

## 어떤 방식으로 만들까요? {#choose-plugin-api}

| | Lua 확장 | DLL 플러그인 |
| --- | --- | --- |
| 만드는 것 | 버튼과 숫자 슬라이더가 있는 패널 | 네이티브 이미지 필터 등 |
| 개발 준비 | UTF-8 텍스트 편집기 | 공식 SDK 헤더와 Windows x64용 C/C++ 컴파일러 |
| 실행 방식 | 조작 버튼에서 허용된 `hf` API 호출 | 호스트가 호출하는 콜백으로 처리 |
| 적합한 작업 | 레이어 추가·정리, 반복 작업 묶기 | RGBA 이미지 픽셀 처리, 숫자·그라데이션·커브로 조절하는 필터 |
| API 버전 | 확장 측의 `hf.api_version`은 1 | 현재 SDK의 `HF_API_VERSION`은 3 |

::: tip 공식 SDK와 최소 예제
[HarmoFlow Plugin SDK API 3 다운로드(ZIP)](/downloads/harmoflow-plugin-sdk-v3.zip). 공식 헤더 `harmoflow_api.h`, 이 가이드용 소형 C 예제 `guide_gray.c`, 빌드 방법이 들어 있습니다. 앱 본체는 포함하지 않습니다. Lua 최소 예제는 SDK 없이 시도할 수 있습니다.
:::

이 SDK는 HarmoFlow Ver.0.1.1의 DLL 플러그인 API 3에 대응합니다. 사용할 HarmoFlow 버전과 필요한 API 기능을 확인하세요. 이 페이지의 기본 C 예제는 API 1 기능만 사용하며 API 1로 등록합니다.

## 1. 최소 Lua 패널 만들기 {#first-lua-panel}

텍스트 편집기에서 새 파일을 만들고 다음 내용을 <strong><code>my_first_panel.lua</code></strong>라는 이름으로 UTF-8(BOM 없음) 형식으로 저장합니다. Windows에서 파일 확장자를 표시하여 `.lua.txt`가 되지 않았는지 확인하세요.

```lua
hf.register_panel {
  id = "example.my_first_panel",
  title = "My First Panel",
  description = "Add one paint layer",
  actions = {
    {
      id = "add_paint",
      label = "Add paint layer",
      run = function(values)
        hf.add_layer("paint", "Practice layer")
        hf.log("Added one paint layer")
      end
    }
  }
}
```

이 예제는 기존 파일을 읽거나 쓰거나 외부 통신을 하지 않으며, 버튼을 누를 때마다 페인트 레이어를 하나 추가합니다. 추가 위치는 선택한 레이어와 텍스처 세트에 따라 결정됩니다. 실제 제작 씬이 아닌 테스트용 씬에서 확인하세요.

### 코드 각 부분의 역할

- `hf.register_panel`: 로드할 때 패널을 등록합니다. 등록 시점에는 레이어를 추가하지 않습니다.
- `id`: 다른 확장과 중복되면 안 되는 식별자입니다. 배포할 때는 `author_name.feature_name`처럼 자신만의 고유한 이름으로 바꾸세요.
- `title`／`description`: 패널 이름과 설명입니다.
- `actions`: 버튼 목록입니다. 각 버튼에도 고유한 `id`와 표시용 `label`이 필요합니다.
- `run(values)`: 사용자가 버튼을 눌렀을 때 실행합니다. `values`는 해당 시점의 슬라이더 값을 ID로 참조할 수 있는 테이블입니다. 이 최소 예제에서는 사용하지 않습니다.

## 2. 불러와서 동작 확인하기 {#test-lua-panel}

1. UV가 있는 작은 모델을 열고 테스트용 씬을 저장합니다.
2. “플러그인 → 플러그인 추가／보기... → 플러그인 추가...”에서 `my_first_panel.lua`를 선택합니다.
3. 목록에서 Lua 확장이 올바르게 등록되었는지 확인합니다.
4. “플러그인”에서 **My First Panel**을 열고 **Add paint layer**를 한 번 누릅니다.
5. 레이어가 하나 늘었는지 확인합니다. Ctrl+Z로 추가를 취소하고 Ctrl+Y로 다시 실행할 수 있는지도 확인합니다.
6. 씬을 저장하고 다시 열어 결과 레이어가 남아 있는지 확인합니다.

파일을 수정한 뒤에는 앱을 종료하고 `extensions/`에 설치된 파일을 교체한 다음 다시 시작합니다. 원래 작업 폴더의 소스만 수정해도 추가할 때 복사한 파일은 업데이트되지 않습니다. [업데이트 절차](./plugins.md#update-plugin)도 참고하세요.

## 3. 동작을 추가할 때의 규칙 {#lua-contract}

### 사용할 수 있는 작업

Lua 확장의 액션에서 사용할 수 있는 `hf` API는 다음 범위입니다. 일반 “스크립트 (Lua)” 화면의 모든 API를 그대로 사용할 수 있는 것은 아닙니다.

| 용도 | API |
| --- | --- |
| 로그 | `log` |
| 레이어 조회 | `layer_count`, `layer_name`, `layer_depth` |
| 추가·삭제·선택 | `add_layer`, `remove_layer`, `set_active_layer` |
| 레이어 상태 | `set_layer_opacity`, `set_layer_visible`, `set_layer_clip`, `set_layer_alpha_lock` |
| Fill 설정 | `set_fill_channel`, `set_fill_uv` |

레이어 번호는 **1부터** 시작합니다. `hf.add_layer`는 새 번호를 반환하지 않습니다. 또한 선택 위치에 따라 중간에 삽입될 수 있으므로, 추가 직후의 `hf.layer_count()`를 새 레이어의 번호로 취급하지 마세요. 번호를 사용하는 작업은 대상 레이어를 확실히 식별한 뒤 실행하세요.

### 슬라이더와 제한

패널의 `controls`에 숫자 슬라이더를 등록할 수 있습니다. 각 슬라이더 ID를 키로 사용하여 액션 안의 `values`에서 값을 읽습니다. 최솟값은 최댓값보다 작아야 하며 유한한 숫자를 사용해야 합니다. 초깃값은 범위 안으로 제한됩니다.

- 패널당 숫자 슬라이더 최대 16개, 액션 최대 16개
- 확장당 패널 최대 8개, 로드 가능한 확장 최대 32개
- 파일은 최대 1 MiB. ID·제목·라벨은 비어 있지 않은 256바이트 이하 문자열
- 패널 ID는 모든 확장에서 고유해야 하며, 컨트롤 ID·액션 ID도 패널 안에서 중복되지 않아야 함

현재 구현은 시작할 때 파일 이름순으로 앞의 Lua 파일 16개까지만 로드를 시도합니다. 실행 중에는 확장을 최대 32개까지 로드할 수 있지만, 재시작 후에도 모두 자동으로 로드하려면 `extensions/` 바로 아래의 `.lua` 파일을 16개 이하로 유지하세요.

### 슬라이더가 있는 예제

다음 예제는 지정한 불투명도의 페인트 레이어를 추가합니다. 같은 이름의 레이어가 있으면 이름에 `_`를 붙이고, 추가한 뒤 이름으로 실제 번호를 찾습니다. 새 레이어가 항상 목록 끝에 추가된다고 가정하지 않기 위한 예제입니다. `opacity` ID와 `values.opacity`가 대응합니다.

```lua
assert(hf.api_version == 1)
hf.register_panel {
    id = "guide.paint_layer",
    title = "Paint Layer Helper",
    description = "Create an empty paint layer with a chosen opacity.",
    controls = {
        {id = "opacity", label = "Opacity", min = 0, max = 1, value = 0.5},
    },
    actions = {
        {
            id = "add",
            label = "Add paint layer",
            run = function(values)
                local name = "Plugin practice"
                local function find_layer()
                    for i = 1, hf.layer_count() do
                        if hf.layer_name(i) == name then return i end
                    end
                end
                while find_layer() do name = name .. "_" end
                hf.add_layer("paint", name)
                local index = assert(find_layer(), "Layer was not created")
                hf.set_layer_opacity(index, values.opacity)
                hf.set_active_layer(index)
            end,
        },
    },
}
```

### Undo와 저장

한 번의 액션에서 기록된 편집은 한 번의 Undo로 묶입니다. 오류가 발생하면 기록된 편집을 되돌리고 원래 선택한 레이어로 복원합니다. 다만 모든 처리에 대해 무조건적인 복구를 보장하지는 않습니다. 처음부터 제작 씬에서 시험하지 말고 실패하는 경우도 테스트하세요.

씬에 저장되는 것은 처리 결과인 일반 레이어입니다. Lua 변수나 패널의 슬라이더 값이 씬과 함께 영구 저장된다고 가정하지 마세요.

### 실행 환경 제한

Lua 확장은 각각 독립적인 Lua 상태를 가집니다. 사용할 수 있는 표준 기능은 기본 함수·`math`·`string`·`table`이 중심이며, 임의의 파일 로드, GPU 접근, 독자적인 Undo API는 없습니다. `load`, `dofile`, `loadfile`, `collectgarbage`, `pcall`, `xpcall`도 제외되어 있습니다.

등록과 액션에는 Lua 명령을 감시하는 2초 실행 제한이 있습니다. C++ 측 처리를 강제로 중단하는 것은 아니며, 무거운 처리를 오랫동안 실행해도 된다는 뜻도 아닙니다. 악성 코드를 안전하게 실행하기 위한 프로세스 격리 기능은 아닙니다.

## DLL 구조 이해하기 {#native-plugin}

DLL은 C ABI를 통해 호스트와 통신합니다. 현재 SDK는 API 3이며, 이전 버전용 DLL은 3 → 2 → 1 순서로 초기화를 시도합니다. 사용하는 기능이 지정한 API 버전에 존재하는지 확인하세요.

| API | 필터 등록 함수 | 입력 방식 |
| --- | --- | --- |
| 1 | `register_filter` | 기본 이미지 콜백 |
| 2 | `register_adjustable_filter` | 최대 16개의 부동소수점 매개변수 |
| 3 | `register_gradient_filter` | 2~16개의 그라데이션 스톱 |
| 3 | `register_curve_filter` | RGB 전체·R·G·B의 커브 4개, 각각 2~16개 점 |

### 진입점

DLL은 이름을 변형하지 않고 `hf_plugin_init(const HfHost*, HfPluginInfo*)`를 내보냅니다. C++에서는 `extern "C"`와 SDK의 `HF_EXPORT`를 사용하세요. 반환값 0은 초기화 성공을 뜻합니다.

초기화 시 `HfPluginInfo`에 `api_version`, `name`, `author`, `version`을 설정하고 호스트의 등록 함수에 콜백을 전달합니다. 전달받은 `HfHost*`는 초기화 중에만 사용하고, 나중에 처리하기 위해 포인터를 보관하지 마세요. 필터 이름, 콜백, 필요한 데이터는 실제 처리 시점에도 유효한 수명을 가져야 합니다.

### 이미지 콜백

기본 `HfFilterDesc`에는 `name`, `apply`, `user`가 있으며, 콜백 형식은 `void apply(HfImage* image, void* user)`입니다. 호스트는 등록 시 기술자를 복사합니다. `HfImage`는 너비 × 높이 × 4바이트 크기의 행 방향으로 연속된 RGBA8 이미지입니다. 이미지 범위 안에서만 수정하고, 알파 변경 여부도 의도적으로 결정하세요. `pixels` 포인터를 바꾸거나 `width`／`height`를 변경하지 말고, 전달받은 버퍼를 제자리에서 처리합니다.

SDK 구조체의 멤버나 함수 테이블을 추측해서 직접 작성하지 말고, 대응하는 공식 헤더를 포함하세요. 이미지 메모리를 해제하지 않고 콜백 이후에도 포인터를 보관하지 않는 설계로 시작하면 수명 관련 문제를 피하기 쉽습니다.

### 최소 C 필터

다운로드에 포함된 `guide_gray.c`는 RGB의 단순 평균을 세 색상 채널에 다시 쓰는 작은 학습용 필터입니다. 알파는 변경하지 않습니다. 지각적 휘도를 정밀하게 계산하는 처리는 아닙니다.

```c
#include <stddef.h>
#include "harmoflow_api.h"

static void grayscale(HfImage* image, void* user) {
    (void)user;
    for (size_t i = 0; i < (size_t)image->width * image->height; ++i) {
        uint8_t* pixel = image->pixels + i * 4;
        uint8_t value = (uint8_t)(((unsigned)pixel[0] + pixel[1] + pixel[2]) / 3);
        pixel[0] = pixel[1] = pixel[2] = value;
    }
}

HF_EXPORT int hf_plugin_init(const HfHost* host, HfPluginInfo* info) {
    if (!host || !info || host->api_version < 1 || !host->register_filter)
        return 1;
    info->api_version = 1;
    info->name = "Guide Grayscale";
    info->author = "Your name";
    info->version = "1.0";
    HfFilterDesc filter = {"Guide Grayscale", grayscale, NULL};
    host->register_filter(&filter);
    return 0;
}
```

이 파일은 C로 빌드합니다. C++로 다시 작성하려면 내보내는 함수를 `extern "C"`로 선언하세요. SDK에 없는 종료 콜백을 가정하거나 초기화 시 전달받은 호스트 포인터를 보관하지 마세요.

### 미리보기와 적용 결과

사용자 제작 DLL 필터는 최대 512 × 512픽셀의 미리보기 이미지에도 호출됩니다. 콜백이 “적용을 눌렀을 때만” 실행된다고 가정하지 말고, 반복해서 호출해도 문제가 없는 이미지 처리로 만드세요. “적용” 시에는 전체 해상도로 처리하고 이미지가 있는 Fill 레이어가 만들어집니다. 사용자 제작 DLL이 자동으로 매개변수를 다시 편집할 수 있는 조정 레이어가 되는 것은 아닙니다.

`Color Adjustment`, `Gradient Map`, `Tone Curve`는 기본 조정 기능을 식별하는 이름입니다. 사용자 제작 필터에 같은 이름을 붙이지 말고 고유한 이름을 사용하세요. 기본 제공되는 세 기능의 조작은 [조정 기능 가이드](./adjustments.md)에서 따로 설명합니다.

## DLL 빌드 및 테스트 {#build-native-plugin}

먼저 위의 공식 SDK ZIP 압축을 풉니다. 앱 본체의 전체 개발 환경을 갖출 필요는 없습니다. 단순한 이미지 콜백이라면 SDK 헤더와 Windows x64용 C/C++ 컴파일러로 시작할 수 있습니다.

1. SDK ZIP 압축을 풀고 `harmoflow_api.h`와 `guide_gray.c`가 있는 폴더를 엽니다.
2. 처음에는 동봉된 예제를 수정하지 않고 빌드한 뒤, 필터 이름과 이미지 처리를 목적에 맞게 편집합니다.
3. x64용 컴파일러 환경에서 공유 라이브러리(DLL)로 빌드합니다. 다른 PC에도 Debug 빌드의 종속 런타임이 있다고 가정하지 마세요.
4. 출력 DLL이 `hf_plugin_init`를 내보내는지 확인합니다.
5. 테스트용 씬을 저장하고 [추가 절차](./plugins.md#install-plugin)에 따라 DLL을 로드합니다. 관리 화면의 정보와 플러그인 메뉴를 모두 확인합니다. **Guide Grayscale**을 열고 BaseColor에서 미리보기 → 취소 → 다시 열기 → 적용을 시도합니다. 레이어, Undo／Redo, 저장·다시 불러오기도 확인합니다.
6. 소스를 변경한 뒤에는 HarmoFlow를 종료하고 다시 빌드한 DLL로 교체한 다음 재시작합니다.

Microsoft의 **x64 Native Tools Command Prompt**에서 헤더와 C 예제를 압축 해제한 폴더로 이동한 뒤 다음 명령을 실행합니다. 컴파일러 설치와 라이선스는 해당 개발 도구 제공업체의 안내를 따르세요.

```bat
cl /nologo /LD /O2 /W4 /I . guide_gray.c /link /OUT:guide_gray.dll
dumpbin /exports guide_gray.dll
```

`dumpbin` 목록에 `hf_plugin_init`가 있다면 해당 이름의 내보내기를 확인한 것입니다. DLL이 HarmoFlow에서 실행되는지는 실제로 로드해서 확인하세요. 나중에 C++ 소스를 사용한다면 빌드 설정도 C++에 맞게 조정하세요.

기본 `HfImage` 콜백만 사용하는 DLL은 HarmoFlow 본체의 Vulkan·ImGui·Lua를 직접 링크할 필요가 없습니다. 별도로 추가한 종속 라이브러리가 있다면 배포 조건과 런타임 종속성을 따로 확인하세요.

## 배포 전 체크리스트 {#plugin-test-checklist}

- **등록**: 최초 추가, 앱 재시작, 같은 파일 이름이나 중복 ID로 인한 실패 확인
- **작업 대상**: 빈 상태, 모델이 있는 상태, 여러 파트, 그룹 안의 선택에서 의도한 대상에 작용하는지 확인
- **반복**: 버튼을 연속으로 누르거나 재실행해도 예상하지 않은 대상이 변경되지 않는지 확인
- **히스토리**: Lua에서는 한 액션의 Undo／Redo, 오류 시 결과와 선택 복구 확인
- **저장**: 처리 후 씬을 저장하고 다시 불러와 필요한 결과가 남는지 확인
- **이미지**: DLL에서는 작은 이미지, 다른 해상도, 투명 픽셀, 매개변수의 최솟값·최댓값 확인
- **안내**: 제작자, 버전, 지원 HarmoFlow/API, 설치 위치, 조작 절차, 종속성, 알려진 제한 사항 명시

이 가이드의 코드는 학습용 최소 예제입니다. C 예제는 Linux에서 컴파일과 CPU 처리(등록, 픽셀 변환, 알파 유지)를 확인했고, Lua 예제는 구문과 모의 API에서의 동작을 확인했습니다. 이 공개 가이드 작성 시점에는 Windows DLL 생성과 실제 HarmoFlow에서의 동작 확인을 수행하지 않았습니다. 사용하는 앱·SDK·개발 환경에서 위 절차를 검증하세요.


### API 3 커브 전달하기 {#api3-curve-contract}

각 커브는 입력값 0과 1인 끝점을 포함해야 하며, 입력값을 중복 없이 오름차순으로 배치해야 합니다. 입력값과 출력값은 모두 0〜1 범위의 유한한 수여야 합니다.
