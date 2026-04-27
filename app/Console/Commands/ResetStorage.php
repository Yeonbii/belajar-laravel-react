<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

#[Signature('app:reset-storage')]
#[Description('Reset storage and recreate symbolic link')]
class ResetStorage extends Command
{
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
}