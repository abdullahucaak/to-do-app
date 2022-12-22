<template>
    <nav class="filter-nav">
        <button @click="filterGuncelle('hepsi')" :class="{active:aktifSekme==='hepsi'}">Listem</button>
        <button @click="filterGuncelle('tamamlandi')" :class="{active:aktifSekme==='tamamlandi'}">Tamamlanan..</button>
        <button @click="filterGuncelle('yapiliyor')" :class="{active:aktifSekme==='yapiliyor'}">Devam Eden..</button>
    </nav>
</template>

<script>
    export default {
        props:['aktifSekme'], /* HomeView'dan çektik. */
        methods:{
          /* filterGuncelle'yi bu componentte, filterDurum'u Homeview componentinde kullandım. */
            filterGuncelle(durum){ /* durum parameter: O an kullanılacak olan durum... |'hepsi'|'tamamlandi'| gibi.. */
                this.$emit('filterDurum',durum) /* durum parametresini NavbarFilter componentine event' şeklinde aktardık. filterDurum event adı(bu filterDurum ismi ile gönderdiğimizi Homeview'da componenti çağırdığımız yerde kullandık.). 2.de parametreyi girdik. */
            }
        }
    }
</script>

<style>
  .filter-nav button {
    background: none;
    border: none;
    color: #bbb;
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
  }
  .filter-nav button.active {
    color: lightgreen;
  }
</style>