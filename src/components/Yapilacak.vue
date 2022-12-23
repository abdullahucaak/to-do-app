<template>
    <div class="main-class" :class="{isaretlendi:yapilacak.yapildi}"> <!-- yapilacak'ın yapıldı property'sine göre isaretlendi class'ını bind et.| 41. video 2:27 bak buraya güzel anlatım. -->
        <div class="baslik">
          <h3 @click="detayGoster=!detayGoster">{{yapilacak.baslik}}</h3>  <!-- HomeView'da yap.baslik demistik. burda yapilacak propsuna atadığımız için yapilacak.baslik dedik. -->
          <div class="icon">
            <router-link :to="{name:'YapilacakGuncelle',params:{id:yapilacak.id}}"> <!-- 1)edit buttonuna tıkladığımızda yönlenmeyi sağlamak için router-link kullandık ve id ye göre yönlendirdik. (index.js incele.)| bu span, 'yapilacak' props'u ile kullanılabilir(aşağıda 'props' olarak çağırdık çünkü). bu sebeple parametre olarak id gönderirken yapilacak.id yazmamız yeterli olacak.2) yönelenecek sayfayı isme göre( router name) yaptık ve :to 'yu başında bind ederek kullandık. virgülden sonra params:{id:yapilacak.id} derken yapilacak props'undan gelen yapilacak.id'yi params id sine atadık.(yapilacak id db/json'da nesnenin id'si) böylece güncelleme işlemini gerçekleştirmiş oluyoruz diyor. -->
                <span class="material-symbols-outlined">edit</span>
            </router-link>
                <span class="material-symbols-outlined" @click="yapilacakSil">delete</span>
                <span class="material-symbols-outlined" @click="toggle" tick>done</span>
          </div>
        </div>
        <div class="detay" v-if="detayGoster">
          <p>{{yapilacak.icerik}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props:['yapilacak'], /* HomeView'da yap elemanını :yapilacak'a bind edip yapilacak propsunu burada tanıttık. ve artık kullanılabilir. */
        data(){
            return{
                detayGoster: false,
                uri:'http://localhost:3000/yapilacaklar/' + this.yapilacak.id /* silmek ya da güncellemek için işlem yapacağımız uri'yi (id'yi) oluşturduk. + işaretinden sonra id'yi değişken olarak tanımlıyoruz. yapilacak : HomeView'daki yap'ı atadığımız props. this.yapilacak.id aslında bir integer. */
            }
        },
        methods:{
            yapilacakSil(){ /* database'e erişirken hep fetch methodunu kullanıyoruz. */
                fetch(this.uri,{method:'DELETE'}) /*silinecek olan uri'ye ulaştık, option kısmına method:'DELETE' dediğimizde db.jsonda silme işlemi gerçekleştirmek istiyoruz diyor. Bu nereden geliyor bilmiyorum */
                .then(()=>this.$emit('sil',this.yapilacak.id)) /* db.json'dan silindikten sonra silindiğini HomeView sayfasına da bildirmemiz lazım. Çünkü HomeView'da yapilacaklar[] dizisi mevcut. Bu diziye başlangıçta bütün db.json çekiliyor. biz db.json'da id'yi sildiğimiz zaman yapilacaklar[] dizisine çekilmiş olan o id'li veriyi de silmemiz gerekiyor.'sil eventini gönderdik ve parametresini this.yapilacaklar.id olarak belirledik.$emit altcomponentten üst componente veri taşıma durumu.' "$emit" metodu, Vue.js uygulamasında bir özel olayı tetiklemek için kullanılır. Bu metod, iki parametre alır: ilk parametre olay adını belirtir ve ikinci parametre ise olayı tetikleyen nesnenin ID'sini belirtir.  */
                .catch((err)=>console.log(err))
            },
            toggle(){ /* güncelleme işlemi. click ile "yapildi":"false" propertysini db.jsonda ve HomeView'da yapilacak[] dizisinde yönetme. */
                fetch(this.uri,{
                    method:'PATCH',
                    headers:{'Content-Type':'application/json'}, /* headers'ı application/json olarak tanımladık çünkü verilerimiz json tipinde. yani bu veri tipinde değişiklik yapacağız. */
                    body:JSON.stringify({yapildi:!this.yapilacak.yapildi}) /* body: değişiklik yapacağımız yer. JSON veriler üzerinde çalıştığımız için JSON.stringify dedik. yapildi: yapilacak propsu ile gelenin yapildiğinin tam tersi... */
                }).then(()=>{ /* then methodunda aynı silme işleminde yaptıgımız gibi HomeView'daki yapilacaklar[] dizisini düzeltiyoruz. Yani aynı işlemi hem db.json'da hem de HomeView'daki dizide yapıyoruz. */
                    this.$emit('toggle',this.yapilacak.id) /* toggle eventini HomeView'a gönderdik. parametre this.yapilacak.id (yani orada yazacağımız method'a göndereceğimiz parametre).. Yani HomeView'da toggle eventi ile gönderdiğimiz id'li data'da güncelleme yapacağız. bu eventi orada yazacağımız fonksiyon atamasıyla tanımlayacağız.. Yapilacak.vue' componentine ekleme yaparak. */
                }).catch((err)=>console.log(err))
                /* PUT ve PATCH'in farkı: Put db.json'da içeriye yeni güncellenen property'i koyar ve diğer tüm propertileri siler. property:id,baslik,icerik,yapildi... PATCH ise sadece güncellenen veriyi değiştirir diğerlerine dokunmaz. */
            }
        }
    }
</script>


<style scoped>

h3{
    user-select:  none;
}
.main-class{
    margin: 20px auto;
    background-color: #212121;
    padding: 20px 20px;
    border-radius: 15px;
    border: 3px solid white;
    color: #f7f1e3;
    transition: 0.8s;
}
.main-class:hover{
    box-shadow: 2px 3px 3px gray;
}
.main-class.isaretlendi{
    border: 3px solid aquamarine;
    transition: 0.8s;
}
.main-class.isaretlendi .tick{
    color: aquamarine;
    transition: 0.3s;
}
.baslik{
    display: flex;
    justify-content: space-between;
    align-content: center;
}
h3{
    cursor: pointer;
}
.material-symbols-outlined{
 cursor: pointer;   
}
.material-symbols-outlined:hover{
    transition: 0.3s;
    color: aquamarine;
}
</style>

