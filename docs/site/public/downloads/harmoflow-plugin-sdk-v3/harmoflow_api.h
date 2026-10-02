/*
 * HarmoFlow Plugin SDK  (C ABI, API version 3; the host also loads APIs 1 and 2)
 *
 * Build a shared library (.dll) exporting:
 *     HF_EXPORT int hf_plugin_init(const HfHost* host, HfPluginInfo* out_info);
 * Return 0 on success. Place the DLL in the "plugins" folder next to harmoflow.exe.
 */
#ifndef HARMOFLOW_API_H
#define HARMOFLOW_API_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

#define HF_API_VERSION 3

#ifdef _WIN32
#define HF_EXPORT __declspec(dllexport)
#else
#define HF_EXPORT __attribute__((visibility("default")))
#endif

/* RGBA8 image, tightly packed, row-major. */
typedef struct HfImage {
    uint32_t width;
    uint32_t height;
    uint8_t* pixels; /* width * height * 4 bytes, mutable in-place */
} HfImage;

/* A filter processes one texture channel image in place. */
typedef struct HfFilterDesc {
    const char* name;                          /* shown in Plugins menu */
    void (*apply)(HfImage* image, void* user); /* called on UI request  */
    void* user;
} HfFilterDesc;

/* API 2: slider values are copied when the user requests Apply. */
typedef struct HfFilterParameterDesc {
    const char* label;
    const char* label_ja; /* optional Japanese display label */
    float min_value, max_value, default_value;
} HfFilterParameterDesc;

typedef struct HfAdjustableFilterDesc {
    const char* name;
    const char* name_ja; /* optional Japanese display name */
    const HfFilterParameterDesc* parameters;
    uint32_t parameter_count; /* at most 16 */
    void (*apply)(HfImage* image, const float* values, uint32_t count, void* user);
    void* user;
} HfAdjustableFilterDesc;

/* API 3: editable RGB gradient stops, mapped to input luminance. */
typedef struct HfGradientStop {
    float position;
    float red, green, blue;
} HfGradientStop;

typedef struct HfGradientFilterDesc {
    const char* name;
    const char* name_ja;
    const HfGradientStop* stops;
    uint32_t stop_count; /* 2..16 */
    const HfFilterParameterDesc* parameters;
    uint32_t parameter_count; /* at most 16 */
    void (*apply)(HfImage* image, const HfGradientStop* stops, uint32_t stop_count,
                  const float* values, uint32_t value_count, void* user);
    void* user;
} HfGradientFilterDesc;

typedef struct HfCurvePoint { float input, output; } HfCurvePoint;
typedef struct HfCurve { uint32_t point_count; HfCurvePoint points[16]; } HfCurve;
typedef struct HfCurveFilterDesc {
    const char* name;
    const char* name_ja;
    const HfCurve* curves;
    uint32_t curve_count; /* RGB master, R, G, B (4) */
    const HfFilterParameterDesc* parameters;
    uint32_t parameter_count;
    void (*apply)(HfImage* image, const HfCurve* curves, uint32_t curve_count,
                  const float* values, uint32_t value_count, void* user);
    void* user;
} HfCurveFilterDesc;

/* Services provided by the host application. */
typedef struct HfHost {
    uint32_t api_version;
    void (*register_filter)(const HfFilterDesc* desc);
    void (*log)(const char* message);
    /* Only available when host->api_version >= 2. */
    void (*register_adjustable_filter)(const HfAdjustableFilterDesc* desc);
    /* Only available when host->api_version >= 3. */
    void (*register_gradient_filter)(const HfGradientFilterDesc* desc);
    void (*register_curve_filter)(const HfCurveFilterDesc* desc);
} HfHost;

/* Filled by the plugin inside hf_plugin_init. */
typedef struct HfPluginInfo {
    uint32_t api_version; /* set to HF_API_VERSION */
    const char* name;
    const char* author;
    const char* version;
} HfPluginInfo;

typedef int (*HfPluginInitFn)(const HfHost* host, HfPluginInfo* out_info);

#ifdef __cplusplus
}
#endif

#endif /* HARMOFLOW_API_H */
