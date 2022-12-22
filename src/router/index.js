import { createRouter, createWebHistory } from "vue-router";

/* oluşturduğumuz view'ları route'a import ettik. */
import HomeView from "../views/HomeView.vue";
import YapilacakEkle from "../views/YapilacakEkle.vue";
import YapilacakGuncelle from "../views/YapilacakGuncelle.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/yapilacak-ekle",
      name: "YapilacakEkle",
      component: YapilacakEkle,
    },
    {
      path: "/yapilacak-guncelle/:id", /* ID'ye dikkat et! burası path bölümü! */
      name: "YapilacakGuncelle",
      component: YapilacakGuncelle,
      props: true /* propslar üzerinden işlem yapmak istediğimiz için true dedik. diyor. incele kodu */
    }
  ],
});

export default router;
