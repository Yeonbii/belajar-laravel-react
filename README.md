# The Doc
Selamat datang siapa pun itu, semoga bermanfaat dan nikmati waktumu 😏

## Pengingat Bagi Pelupa
- Setelah clone, jalankan command ini
```sh
cd belajar-livewire
composer install
cp .env.example .env
php artisan key:generate
```
- Sesuaikan file .env
- Setelah itu lanjutkan ini
```sh
php artisan migrate
npm install
npm run build
```
- Jalankan projectnya
```sh
composer run dev
```

## Coretan
> Pada dasarnya hanyalah semacam 'coretan' setiap aku belajar dan itu mungkin aku anggap penting.

### Pesan Validasi Bahasa Indonesia
- Jalankan perintah ini di terminal:
```sh
php artisan lang:publish
```

- Buat file baru `lang/id/validation.php`
```sh
<?php

return [
    'required'  => 'Kolom :attribute wajib diisi.',
    'string'    => 'Kolom :attribute harus berupa teks.',
    'email'     => 'Kolom :attribute harus berupa alamat email yang valid.',
    'max'       => [
        'string' => 'Kolom :attribute tidak boleh lebih dari :max karakter.',
    ],
    'min'       => [
        'string' => 'Kolom :attribute minimal :min karakter.',
    ],
    'unique'    => ':attribute sudah terdaftar.',
    'confirmed' => 'Konfirmasi :attribute tidak cocok.',

    'attributes' => [
        'name'                  => 'Nama',
        'email'                 => 'Email',
        'password'              => 'Password',
        'password_confirmation' => 'Konfirmasi password',
    ],
];
```

- lalu buka file `.env` dan ganti bagian ini:
```sh
APP_LOCALE=id
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=id_ID
```

- INGAT setelah mengubah file `.env` jalankan ini:
```sh
php artisan config:clear
```