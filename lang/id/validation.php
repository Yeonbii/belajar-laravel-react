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