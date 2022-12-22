<!-- sayfayı index.js'de router'a ekledik. Ya da herhangi bir componentte çağırabilirdik. -->
<template>
    <form @submit.prevent="yapilacakEkle"> <!-- submit olduğunda çalışacak olan fonksiyon.. prevent özelliği verileri yakalamak için dedi.. Not: Prevent olmadığında $router.push('/') ile ana sayfaya yönlendirme yapmadı ve submit ettiğimde olduğum sayfayı yeniliyor. -->
        <label>Başlık</label>
        <input v-model="baslik" type="text" required>
        <label>İçerik</label>
        <input v-model="icerik" type="text" required>
        <button>Ekle</button>
    </form>
</template>

<script>
    export default {
       data(){
        return{
            baslik:'',
            icerik:''
        }
       },
       methods:{
        yapilacakEkle(){
            let eklenecekYapilacakNesnesi={ /* eklenecekYapilacakNesnesi ===== yapilacak propsu ===== döngüdeki: yap */
                id:Math.floor(Math.random()* 100000), /* Math.floor() tamsayıya yuvarlıyor, Math.random() 0 ile 1 arasında rastgele bir sayı üretiyor. *100.000 ===== 0 ile 100.000 arası bir sayı üretiyor. Bunu yapmamızın sebebi id'ler kendine has olduğu için çakışmasın diye böyle bir yöntem geliştirmiş. Yani 1/100.000 patlama ihtimali var, kötü kod. */
                baslik:this.baslik,
                icerik:this.icerik,
                yapildi:false
            }
            /* yapılacak nesnesini db.json dosyası içersine ekleme: */
            fetch('http://localhost:3000/yapilacaklar',{ /* ilk parametre, uri'yi belirledik. uri'miz bu adres. yani bütün yapılacak dizisi burada yer alıyor. */
                method:'POST',                          /* ikinci parametre */ /* POST: ekleme işlemi */
                headers:{'Content-Type':'application/json'}, /* Başlık kısmında birden fazla başlık ekleyebiliriz, bizim ekleyeceğimiz başlık json tipi yani Content-Type olmalı */ 
                body:JSON.stringify(eklenecekYapilacakNesnesi)/* eklenecekYapilacakNesnesi nesnesini body içerisine aktardık. */
            }).then(()=>{               /* yükleme işlemi başaralı ise... */
                this.$router.push('/') /* Yönlendirme işlemini anasayfaya yaptık, push içerisinde path kullandık.(router path) */
            })
        }
       }
    }
</script>

<style>
     form{
        width: 50%;
        margin: 0 auto;
        background-color: #D8D9CF;
        padding: 20px;
        border-radius: 10px;
    }
    form button{
     display: block;   
     margin: 20px auto 0;
     background-color: #E26868;
     color: white;
     padding: 10px 30px;
     border: 0;
     border-radius: 6px;
     font-size: 16px;
     font-weight: 300;
     cursor: pointer;
    }
    form button:hover{
        background-color: #d75555;
        transition: 0.5s;
        box-shadow: 1px 1px #53a7ea, 2px 2px #53a7ea, 3px 3px #53a7ea;
        transform: translateX(-3px);
    }
    label{
        display: block;
        color: #212121;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 1px;
        margin: 20px 0 10px 0;
    }
    input{
        padding: 10px;
        border: 1px;
        border-radius: 5px;
        border-bottom: 1px solid #ddd;
        width: 100%;
        box-sizing: border-box;
    }
    textarea{
        border: 1px solid #ddd;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        height: 100px;
    }
</style>