<template>
  <div class="home">

    <h2>To Do App</h2>

    <NavbarFilter @filterDurum="aktifSekme=$event" :aktifSekme="aktifSekme" /> <!--  ilk kod: aktifSekme diye bir data oluşturduk, ve bunu $event olarak ayarladık. -->

    <div v-if="yapilacaklar.length"> <!-- yapılacaklar uzunlugunda içerik varsa listeyi göster, yoksa aşağıdaki else div'ini göster. -->
      <div v-for="yap in filtrelenmisListeElemanlari" :key="yap.id"> <!-- 1) id'yi anahtar olarak al. id'ye göre döndür. çünkü id eşsiz. her bir data yap olarak döndürüldü 2)orjinali yap in yapilacaklar idi... filtreledikten sonra fonksiyonu yerleştirdik. -->
        <Yapilacak :yapilacak="yap" @sil="silHandle" @toggle="toggleHandle"/> <!-- 1) yapilacak diye yeni bir props oluşturduk ve bind ettik. ve buna üstteki her bir yap'ı atadık.(döngünün içinde dönürülen elemanları yani) ve bu yapilacak'ı kullanacağımız componentte props olarak tanımlayıp orada kullandık.  2) Yapilacak.vue'dan gelen sil eventi tetiklendiğinde çalışacak olan methodu(silHandle)'ı atadık.. 3) Yapilacak.vue'dan gelen yapildi eventi tetiklendiğinde çalışacak olan methodu(toggleHandle)'ı atadık.-->
      </div>
    </div>
    <div v-else>
      Yapılacaklar Yükleniyor...
    </div>
  </div>
</template>

<script>
  import Yapilacak from '../components/Yapilacak.vue'
  import NavbarFilter from '../components/NavbarFilter.vue'

  export default {
    components:{Yapilacak,NavbarFilter},
    data(){
      return{
        yapilacaklar:[],
        aktifSekme: 'hepsi'
      }
    },
    mounted(){
      fetch('http://localhost:3000/yapilacaklar')/* datayı çekeceğimiz adres alanı. */
      .then((res)=>res.json()) /* jsonlanmış olarak dataya eriştik. res: respond/cevap */
      .then((data)=>this.yapilacaklar=data)/* data'yı this.yapilacaklar[] dizisine aktardık. */
      .catch((err)=>console.log(err))
    },
    methods:{
      silHandle(id){ /* aldığımız id parametresi Yapilacak.vue'dan 'sil' methodu ile gönderdiğimiz this.yapilacak.id. çünkü id'ye göre yapilacaklar[] dizisinden silme işlemi gerçekleştireceğiz. */
        this.yapilacaklar=this.yapilacaklar.filter(yap=>{ /* diziye eriştik, daha sonra dizide filtreleme yaptık. */
          return yap.id!==id /* bir filtreleme yaptık. gelen id ''parametresine'' sahip olmayan bütün verileri tekrardan this.yapilacaklara aktardık. */
        })
      },
      toggleHandle(id){ 
        let yap= this.yapilacaklar.find(yapilacak=>{ /* find methodu ile önce değişikliği algıladık. */
          return yapilacak.id==id /* yapilacak ile gelen id == id ise... yapilacak = props... yani yapilacaklar dizisi içerisindeki döndürülen her bir yap */
        })

        yap.yapildi=!yap.yapildi
        /*sonuç: parametrede gelen id o anki yapilacak için(find methodu ile bütün yapilacak'lar içerisinde döndü) eşit olanını buldu.. yapilacak'ın bütün elemanlarını(baslik,icerik,yapildi) let yap'a aktardı. ardından yap'ın yapildi'sini değiştirdik */
      }
      /* filter methodu ile dizi içerisindeki bütün elemanlar etkilenir, find methodu ile sadece bir eleman etkilenir. */
    },
    computed:{ /* listede filtreleme işlemi için computed kullanacağız. değişikliğe uğrayan alanlar için computed kullanılır. computed çalıştıgında herhangi bir harekette otomatik güncelleme yapar ve sayfa yenilemesi yapmaz(önemli). */
      filtrelenmisListeElemanlari(){ /* bu fonksiyonu v-for içerisinde kullanacağız. Her değişiklik olduğunda tekrar çalışacak. 3. durumumuz var: hepsi, tamamlandi, yapiliyor */
        if(this.aktifSekme==='tamamlandi'){
          return this.yapilacaklar.filter(yapilacak=>yapilacak.yapildi) /* her elemanı döndür (filtrelemek için): yapilacak=>yapilacak.yapildi ...true ise. listeye aktar */
        }
        if(this.aktifSekme==='yapiliyor'){
          return this.yapilacaklar.filter(yapilacak=>!yapilacak.yapildi) /* her elemanı döndür (filtrelemek için): yapilacak=>!yapilacak.yapildi ...false ise. listeye aktar */
        }
        return this.yapilacaklar /* eğer bu iki if bloğunu da girmiyorsa o zaman 'hepsi' olarak gelmiştir... o zaman return this.yapilacaklar */
      }
    }
  }
</script>

<style scoped>
.home{
  width: 50%;
  margin: 0 auto;
}
</style>