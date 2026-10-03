import Layout from "./Layout.vue";
import GuideMedia from "./GuideMedia.vue";
import GuideConcept from "./GuideConcept.vue";
import GuideFlow from "./GuideFlow.vue";
import ReleaseNotes from "./ReleaseNotes.vue";
import "./custom.css";
import "./release-fonts.css";
export default { Layout, enhanceApp({ app }) { app.component('GuideMedia', GuideMedia); app.component('GuideFlow', GuideFlow); app.component('GuideConcept', GuideConcept); app.component('ReleaseNotes', ReleaseNotes); } };
