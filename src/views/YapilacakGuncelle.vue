<!-- bu sayfaya gelirken yönlenme kullanacağız, yönlenirken de id parametresi kullanacağız. bu sebeple route oluşturduk. index.js de parametre kısmını incele -->
<!-- 45. video önemli video.. -->
<template>
    <h2>Yapılacak Güncelle  id: {{ id }} </h2>    
    <form @submit.prevent="handleSubmit">
        <label>Başlık:</label>
        <input type="text" v-model="baslik">
        <label>İçerik:</label>
        <input type="text" v-model="icerik">
        <button>Güncelle</button>
    </form>
</template>

<script>
    export default {
        props:['id'], /* Yapilacak.vue dosyasında 6.satırda gönderdiğimiz id'yi yakalamak için props olarak ifade ettik. bi tık daha iyi anlaman gereken bir konu. */
        data(){
            return{
                baslik:'',
                icerik:'',
                uri: 'http://localhost:3000/yapilacaklar/' + this.id /* güncellenecek olan uri datasını oluşturduk. */
            }
        },
        mounted(){        /* güncellenecek olan nesne'nin verilerine erişip başlık ve içerik propertylerini çekmeli, v-model ile inputlara doldurmalıyız.ardından değişikliği güncellemek için. bunun için mounted alanına ihtiyacımız var. sayfa yüklenmeden verileri çekeceğiz. */
        /* promiss zincirleri */
        /* aşağıda ki işlem bütününde uri ile datayı çekip inputlara doldurduk. */
            fetch(this.uri) /* get işlemi ile uriye eriştik. */
                .then((res)=>res.json()) /* bilgiler geldikten sonra then metodu çalıştı.sonra res=cevap geldi. cevabı json tipine döndürdük. */
                .then(data=>{                /* dataya eriştik. */
                    this.baslik=data.baslik /* datadan gelen başlığı this.baslik'a doldurduk. yukarıda v-model ile de eş zamanlı olarak input'a doldurmuş olduk. */
                    this.icerik=data.icerik
                })
                /* artık düzenleme yapabiliriz. düzenleme için ilk yapacağımız işlem yukarıda form'un submit eventini tetiklemek. */
        },
        methods:{
            handleSubmit(){ /* burada çalıştıracağımız güncelleme method'u sadece baslik ve icerik property'lerini güncelleyeceği için, yapildi ve id property'lerini değiştirmeyeceğimiz için yine PATCH olacak. */
                fetch(this.uri,{
                    method:'PATCH', /* 'PATCH' is request method: browser'da ctrl+shift+ı diyerek network alanından incele */
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({baslik:this.baslik,icerik:this.icerik}) /* içerisinde sadece baslik ve icerik property'lerini göndereceğimi belirttim. baslik'a this.baslik'i atadım. bunu yaptıktan sonra bir yönlendirme işlemi yapmamız gerek. */
                }).then(()=>{ /* yönlendirme işlemi */
                    this.$router.push('/') /* ana sayfaya yönlendirdik. */
                }).catch((err)=>console.log(err))/* tek satır kod olduğu için süslü parantez kullanmadık. */
            }
        }
        /* browser'da ctrl+shift+ı diyerek network alanında name===== id'dir. Response headers içinde Content-Type'ı application/json olarak biz ayarladık. geri kalan headerları Fetch methodunun kendisi ayarlıyor. BURADA PATCH GET DELETE GİBİ request method'ları incele önemli !  */
    }
</script>

<style scoped>
    h2{
        width: 50%;
        margin: 0 auto;
    }
</style>