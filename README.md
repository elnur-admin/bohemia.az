# Bohemia satış saytı

Bu sayt əlavə proqram quraşdırmadan işləyən sürətli statik mağazadır. Sifariş düyməsi WhatsApp-a yönləndirir; Supabase qoşulduqda sifarişin nüsxəsi bazada da saxlanır.

## Yayımlamazdan əvvəl mütləq edin

1. `config.js` içində `whatsappNumber` və `whatsappDisplay` dəyərlərini öz nömrənizlə dəyişin. Nümunə: `994501234567`.
2. `data/products.json`-da hər məhsulun `sourcePrice`, `price`, `sourceUrl` və `image` hissəsini faktiki Temu elanına uyğun yoxlayın. `price` həmişə `sourcePrice × 2` olmalıdır. Hazır şəkillər dizayn nümunəsidir; Temu-dan istifadə icazəniz olan faktiki məhsul şəkli ilə əvəzləyin.
3. `index.html` içində `https://example.com/` və `YOUR-DOMAIN.az` yerlərini öz domeninizlə əvəzləyin.
4. Google Analytics üçün `config.js`-də `googleAnalyticsId` sahəsinə `G-...` identifikatorunu yazın.

## Supabase ilə sifariş bazası

1. [Supabase](https://supabase.com) hesabı və yeni layihə yaradın.
2. SQL Editor-də `supabase-schema.sql` faylını işə salın.
3. Project Settings → API-dən **Project URL** və yalnız **anon public** açarını `config.js`-ə yazın. `service_role` açarını heç vaxt sayta yazmayın.
4. Spam üçün Supabase Dashboard-da CAPTCHA/Turnstile və ya Edge Function + rate limit əlavə etmək tövsiyə olunur. Mövcud form telefon və uzunluq validasiyası edir; WhatsApp isə əsas sifariş kanalıdır.

## Domen, hosting və SSL

1. `.az` və ya `.com` domeni etibarlı domen satıcısından alın.
2. Cloudflare Pages, Netlify və ya Vercel-dən birini seçin. Bu statik sayt üçün pulsuz plan kifayətdir.
3. Bütün layihə qovluğunu GitHub-a və ya hostinqin drag-and-drop bölməsinə yükləyin.
4. Hostinqdə domeni əlavə edin və verilən DNS qeydlərini domen satıcınızın panelinə köçürün.
5. Hostinqin SSL/HTTPS seçimini aktiv edin. Cloudflare/Netlify/Vercel bunu adətən pulsuz verir.
6. DNS yayılması 5 dəqiqə–24 saat çəkə bilər.

## Ödəniş və sifariş axını

İlkin versiya: ziyarətçi məhsulu seçir → formaya ad/nömrə yazır → WhatsApp söhbəti açılır → siz çatdırılma, stok və ödənişi təsdiqləyirsiniz. Yerli bazar üçün bu ən sadə və güvənli başlanğıcdır. Kartla ödəniş əlavə etmək üçün Azərbaycan üzrə lisenziyalı ödəniş provayderi və vergi/hüquqi tələblər ayrıca həll edilməlidir.

## Deploydan sonra yoxlama siyahısı

- [ ] Hər məhsulun linki, şəkli, stok və 2× qiyməti doğrudur.
- [ ] WhatsApp nömrəsi həm telefonda, həm kompüterdə düzgün açılır.
- [ ] Test sifarişi Supabase `orders` cədvəlinə düşür.
- [ ] Sayt HTTPS ilə açılır və telefon görünüşündə yoxlanır.
- [ ] `sitemap.xml`, `robots.txt`, canonical və Open Graph domeninizə dəyişdirilib.
- [ ] GA Realtime bölməsində bir test ziyarəti görünür.
- [ ] Məxfilik, çatdırılma, qaytarma və əlaqə səhifələri əlavə olunub.
