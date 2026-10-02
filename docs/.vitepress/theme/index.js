import Layout from "./Layout.vue";
import GuideMedia from "./GuideMedia.vue";
import GuideFlow from "./GuideFlow.vue";
import "./custom.css";
export default { Layout, enhanceApp({ app }) { app.component('GuideMedia', GuideMedia); app.component('GuideFlow', GuideFlow); } };
