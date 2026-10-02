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
