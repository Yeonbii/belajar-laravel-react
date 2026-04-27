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

### Cara Menambahkan Atribut Pada Table Lama

- Buat migration baru

```sh
php artisan make:migration add_avatar_to_users_table
```

- Masukkan atribut yang ingin dibuat pada file baru tersebut. Setelah itu jalankan ini:

```sh
php artisan migrate
```

- Lalu jalankan ini untuk menghubungkan `storage/app/public/` (tempat file disimpan) dengan folder `public/storage/` (yang bisa diakses browser):

```sh
php artisan storage:link
```

- Lalu tambahkan atribut tersebut pada `$fillable` pada model table.

- Setelah itu, JANGAN LUPA perbaharui semua kode yuang berhubungan dengan atribut atau table tersebut, seperti method `create`, `update`, dll.

### Reset Isi Folder `public/storage/`

- Jalankan ini:

```sh
php artisan tinker
```

- Lalu ini:

```sh
Storage::disk('public')->deleteDirectory('/');
Storage::disk('public')->makeDirectory('/');
```

### Custom Command Untuk Reset App

- Buat command untuk reset storage, untuk menghapus isi folder storage dan ngebuat ulang sync link

```sh
php artisan make:command ResetStorage
```

- Masukkan ini dalam file yang telah dibuat

```sh
public function handle()
{
    $link = public_path('storage');
    $target = storage_path('app/public');

    // 🔍 1. Deteksi kondisi storage
    if (is_link($link)) {
        $this->info('Existing symlink detected.');
    } elseif (is_dir($link)) {
        $this->warn('Storage exists as a directory (not symlink).');
    }

    // 🗑️ 2. Hapus jika ada
    if (file_exists($link) || is_link($link)) {
        try {
            File::delete($link);

            // fallback kalau masih ada (biasanya Windows)
            if (file_exists($link)) {
                rmdir($link);
            }

            $this->info('Old storage link removed!');
        } catch (\Throwable $e) {
            $this->error('Failed to remove storage: ' . $e->getMessage());
        }
    }

    // 🧹 3. Bersihkan isi storage/app/public
    File::cleanDirectory($target);
    $this->info('Storage cleaned!');

    // 🔗 4. Buat ulang symlink
    $this->call('storage:link');

    $this->info('Storage link recreated!');
}
```

- Lalu tambahkan ini di file `composer.json` pada bagian `scripts`

```sh
"reset-app": [
        "@php artisan down",
        "@php artisan app:reset-storage",
        "@php artisan migrate:fresh --seed",
        "@php artisan optimize:clear",
        "@php artisan up"
    ]
```

- Selesai dan jalankan ini untuk melakukan command yang baru dibuat

```sh
composer run reset-app
```
