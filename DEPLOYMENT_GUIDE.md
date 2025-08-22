# دليل رفع موقع Dentonexus على الاستضافة

## نظرة عامة
هذا الدليل يوضح كيفية رفع موقع Dentonexus على مختلف أنواع الاستضافات وإعداده للعمل بشكل صحيح.

## متطلبات الاستضافة

### الحد الأدنى للمتطلبات
- **مساحة التخزين**: 50 ميجابايت على الأقل
- **عرض النطاق**: 1 جيجابايت شهرياً للمواقع الصغيرة
- **دعم HTML/CSS/JavaScript**: مطلوب
- **دعم HTTPS**: مُوصى به بشدة

### أنواع الاستضافة المناسبة
1. **الاستضافة المشتركة** (Shared Hosting)
2. **الاستضافة السحابية** (Cloud Hosting)
3. **خوادم VPS**
4. **خدمات الاستضافة المجانية** (للاختبار)

## خطوات الرفع على الاستضافة

### الخطوة 1: تحضير الملفات
```bash
# تأكد من وجود جميع الملفات المطلوبة
dentonexus_website/
├── index.html
├── css/style.css
├── js/script.js
├── assets/images/
└── README.md
```

### الخطوة 2: ضغط الملفات (اختياري)
```bash
# إنشاء ملف مضغوط للرفع السريع
zip -r dentonexus_website.zip dentonexus_website/
```

### الخطوة 3: الرفع عبر FTP
```bash
# استخدام FileZilla أو أي برنامج FTP
Host: ftp.yourdomain.com
Username: your_username
Password: your_password
Port: 21 (أو 22 للـ SFTP)
```

### الخطوة 4: الرفع عبر cPanel
1. سجل دخول إلى cPanel
2. اذهب إلى "File Manager"
3. انتقل إلى مجلد `public_html`
4. ارفع الملفات أو الملف المضغوط
5. استخرج الملفات إذا كانت مضغوطة

## إعدادات خاصة لمختلف الاستضافات

### 1. الاستضافة المشتركة (Shared Hosting)

#### cPanel
```apache
# إضافة في ملف .htaccess (اختياري)
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# ضغط الملفات
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 2. الاستضافة السحابية

#### AWS S3 + CloudFront
```bash
# رفع الملفات إلى S3
aws s3 sync dentonexus_website/ s3://your-bucket-name/ --delete

# إعداد CloudFront للتوزيع العالمي
```

#### Netlify
```bash
# رفع مباشر عبر drag & drop
# أو استخدام Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dentonexus_website
```

#### Vercel
```bash
# رفع عبر Vercel CLI
npm install -g vercel
cd dentonexus_website
vercel --prod
```

### 3. GitHub Pages
```bash
# إنشاء repository جديد
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/dentonexus.git
git push -u origin main

# تفعيل GitHub Pages من Settings
```

## إعدادات DNS والدومين

### ربط الدومين
```dns
# إعدادات DNS للدومين الرئيسي
A Record: @ -> IP_ADDRESS
CNAME: www -> yourdomain.com

# للـ subdomain
CNAME: dentonexus -> yourdomain.com
```

### SSL Certificate
```apache
# التأكد من تفعيل SSL
# معظم الاستضافات توفر Let's Encrypt مجاناً
```

## اختبار الموقع بعد الرفع

### فحص الوظائف الأساسية
- [ ] تحميل الصفحة الرئيسية
- [ ] عمل قائمة التنقل
- [ ] تحميل الصور والأيقونات
- [ ] عمل النماذج (تسجيل الدخول/التسجيل)
- [ ] عمل البحث
- [ ] التبديل بين اللغات
- [ ] التصميم المتجاوب على الجوال

### أدوات الفحص
```bash
# فحص سرعة الموقع
https://pagespeed.web.dev/

# فحص الأمان
https://securityheaders.com/

# فحص التوافق مع الجوال
https://search.google.com/test/mobile-friendly
```

## استكشاف الأخطاء وحلها

### مشاكل شائعة وحلولها

#### 1. الصور لا تظهر
```html
<!-- تأكد من المسارات النسبية -->
<img src="assets/images/logo.png" alt="Logo">
<!-- وليس -->
<img src="/assets/images/logo.png" alt="Logo">
```

#### 2. ملفات CSS/JS لا تعمل
```html
<!-- تأكد من المسارات الصحيحة -->
<link rel="stylesheet" href="css/style.css">
<script src="js/script.js"></script>
```

#### 3. مشاكل الخطوط
```css
/* تأكد من تحميل الخطوط من Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
```

#### 4. مشاكل HTTPS
```apache
# إضافة في .htaccess لإجبار HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## تحسين الأداء

### ضغط الصور
```bash
# استخدام أدوات ضغط الصور
# TinyPNG, ImageOptim, أو أدوات أونلاين أخرى
```

### تحسين CSS و JavaScript
```bash
# تصغير الملفات (Minification)
# يمكن استخدام أدوات أونلاين أو build tools
```

### إعداد Cache Headers
```apache
# إضافة في .htaccess
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
</IfModule>
```

## الأمان

### حماية الملفات الحساسة
```apache
# منع الوصول لملفات معينة
<Files "*.md">
    Order allow,deny
    Deny from all
</Files>
```

### Headers الأمان
```apache
# إضافة headers أمان
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

## النسخ الاحتياطي

### نسخ احتياطية دورية
```bash
# إنشاء نسخة احتياطية
tar -czf dentonexus_backup_$(date +%Y%m%d).tar.gz dentonexus_website/

# رفع النسخة الاحتياطية لخدمة سحابية
```

## المراقبة والصيانة

### مراقبة الموقع
- استخدام Google Analytics للإحصائيات
- مراقبة uptime باستخدام خدمات مثل UptimeRobot
- فحص دوري للروابط المكسورة

### التحديثات الدورية
- تحديث المحتوى والبحوث
- فحص الأمان
- تحديث مكتبات JavaScript إذا أُضيفت لاحقاً

## خدمات الاستضافة الموصى بها

### للمواقع التجارية
1. **SiteGround** - استضافة موثوقة مع دعم ممتاز
2. **Bluehost** - مناسبة للمبتدئين
3. **DigitalOcean** - للمطورين المتقدمين

### للاختبار والتطوير
1. **Netlify** - مجاني مع ميزات متقدمة
2. **Vercel** - سريع وسهل الاستخدام
3. **GitHub Pages** - مجاني للمشاريع العامة

## الدعم الفني

### في حالة وجود مشاكل
1. تحقق من logs الخادم
2. استخدم أدوات Developer Tools في المتصفح
3. تواصل مع دعم الاستضافة
4. راجع هذا الدليل للحلول الشائعة

---

**ملاحظة**: هذا الدليل يغطي الحالات الأكثر شيوعاً. قد تحتاج إلى تعديلات خاصة حسب نوع الاستضافة المستخدمة.

