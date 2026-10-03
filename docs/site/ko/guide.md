---
title: 사용자 가이드
description: HarmoFlow의 기본 조작부터 그리기, 질감, 내보내기, 설정까지 안내하는 사용자 가이드입니다.
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# 사용자 가이드

그리기 준비부터 질감 마무리까지, 제작 흐름에 맞춰 필요한 조작과 설정을 찾아보세요. 각 항목을 선택하면 자세한 가이드가 열립니다.

이 가이드는 HarmoFlow의 기본 조작, 각 패널의 설정과 지원 범위를 설명합니다. 실제 화면, 조작 영상과 개념도로 작업 순서와 원리를 확인할 수 있습니다. 패널 배치는 변경할 수 있습니다.

## 시작하기 {#start}

모델 불러오기부터 레이어 편집과 저장까지. 첫 텍스처를 그리기 위한 기본 순서.

Ver.0.1.1의 업데이트 자동 알림과 업데이트 전 백업도 안내합니다.

<a :href="withBase('/ko/help/start.html')">시작하기 가이드 읽기 →</a>

## 작업 화면과 메시 파트 {#workspace}

화면 구성과 각 패널의 역할, 메시 파트와 텍스처 세트를 전환하는 방법.

3D 뷰포트와 UV 캔버스에서 오른쪽 버튼을 누른 채 슬라이드하는 파이 메뉴도 설명합니다.

<a :href="withBase('/ko/help/workspace.html')">작업 화면과 메시 파트 가이드 읽기 →</a>

## 뷰포트·메시·표시 {#viewport}

카메라 조작, PBR·NPR 표시, 파트 선택과 표시, 셰이프 키 확인.

<a :href="withBase('/ko/help/viewport.html')">뷰포트·메시·표시 가이드 읽기 →</a>

## UV 보기 설정 {#uv}

UV 편집기에서 그리기, 이동·확대/축소·회전, 와이어와 배경 표시 설정.

<a :href="withBase('/ko/help/uv.html')">UV 보기 설정 가이드 읽기 →</a>

## 브러시·지우개·색상 {#brush}

브러시와 지우개 설정, 필압·흔들림 보정, 면 채우기와 색상 추출.

<a :href="withBase('/ko/help/brush.html')">브러시·지우개·색상 가이드 읽기 →</a>

## 레이어·마스크·합성 {#layers}

레이어 종류와 합성, 그룹, 마스크, 클리핑을 활용한 부분 편집.

Ver.0.1.1에서 불투명도를 변경할 때의 재합성 개선도 안내합니다.

<a :href="withBase('/ko/help/layers.html')">레이어·마스크·합성 가이드 읽기 →</a>

## 색조 보정·톤 커브·그라디언트 맵 {#adjustments}

세 가지 조정 레이어의 용도와 설정, 다시 편집하는 방법, 저장과 PSD 내보내기 시 주의사항.

[색조 보정·톤 커브·그라디언트 맵](./help/adjustments.md)

## 스탬프·텍스트·도형 {#stamps}

이미지·텍스트·도형을 모델에 배치하는 방법과 각 스탬프의 설정.

<a :href="withBase('/ko/help/stamps.html')">스탬프·텍스트·도형 가이드 읽기 →</a>

## 패스 그리기와 편집 {#paths}

앵커와 핸들로 패스를 만들고 편집하며, 채우기와 이중 외곽선을 조절하는 방법.

<a :href="withBase('/ko/help/paths.html')">패스 그리기와 편집 가이드 읽기 →</a>

## 이미지 Fill·머티리얼·패턴 {#materials}

이미지 Fill과 UV 변환, 프로시저럴 패턴 조절, 머티리얼 프리셋 활용.

<a :href="withBase('/ko/help/materials.html')">이미지 Fill·머티리얼·패턴 가이드 읽기 →</a>

## 채널 확인하기 {#channels}

BaseColor를 비롯한 6개 채널과 작업·내보내기·미리보기 해상도의 차이.

<a :href="withBase('/ko/help/channels.html')">채널 확인하기 가이드 읽기 →</a>

## 베이크된 형상 정보 확인하기 {#mesh-maps}

곡률, AO, 노멀, 위치 맵을 읽는 방법과 자동 베이크·다시 베이크의 지원 범위.

<a :href="withBase('/ko/help/mesh-maps.html')">베이크된 형상 정보 확인하기 가이드 읽기 →</a>

## 모서리와 오목한 곳에 웨더링 추가하기 {#weathering}

형상 맵으로 볼록한 모서리·오목한 곳·차폐된 부분에 웨더링을 배치하는 순서.

<a :href="withBase('/ko/help/weathering.html')">모서리와 오목한 곳에 웨더링 추가하기 가이드 읽기 →</a>

## 에셋 찾기와 가져오기 {#assets}

프로젝트의 에셋을 검색·필터링하고 이미지와 Unity Package를 가져오는 방법.

<a :href="withBase('/ko/help/assets.html')">에셋 찾기와 가져오기 가이드 읽기 →</a>

## 프로젝트·저장·복구 {#projects}

프로젝트와 씬 만들기, 저장·패키지 내보내기, 자동 저장에서 복구하기.

<a :href="withBase('/ko/help/projects.html')">프로젝트·저장·복구 가이드 읽기 →</a>

## 이미지 내보내기 {#export}

PNG·JPG·TGA·EXR·PSD 출력, 채널과 노멀 방향, 파트 묶기.

<a :href="withBase('/ko/help/export.html')">이미지 내보내기 가이드 읽기 →</a>

## 환경 설정·히스토리·확장 {#settings}

홈 화면, 필압과 그리기 감도, 화면 배치, VRAM, Lua와 플러그인 설정.

<a :href="withBase('/ko/help/settings.html')">환경 설정·히스토리·확장 가이드 읽기 →</a>

## 플러그인 설치 및 관리 {#plugins}

Lua 확장과 DLL 플러그인의 추가, 실행, 업데이트, 오류 확인 방법과 기본 조정 기능과의 차이를 알아봅니다.

[플러그인 설치 및 관리](./help/plugins.md)

## 플러그인 만들기 {#plugin-development}

Lua 확장 최소 예제부터 패널 등록, Undo, DLL SDK 구조, 빌드와 동작 확인까지 알아봅니다.

[플러그인 만들기](./help/plugin-development.md)

## 단축키 한눈에 보기 {#shortcuts}

그리기·카메라·UV·저장에 쓰는 키 조작과 키 설정 변경 방법.

<a :href="withBase('/ko/help/shortcuts.html')">단축키 한눈에 보기 가이드 읽기 →</a>

## 용어 설명 {#glossary}

UV, PBR, 베이크, 마스크, VRAM 등 텍스처 제작에 쓰는 용어의 뜻.

<a :href="withBase('/ko/help/glossary.html')">용어 설명 가이드 읽기 →</a>

## 문제 해결 {#troubleshooting}

UV와 와이어 표시, 파트 전환, 메시 맵, 레이어 표시를 확인하는 방법.

<a :href="withBase('/ko/help/troubleshooting.html')">문제 해결 가이드 읽기 →</a>
