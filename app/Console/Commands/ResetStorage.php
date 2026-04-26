<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

#[Signature('app:reset-storage')]
#[Description('Command description')]
class ResetStorage extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
  {
    File::cleanDirectory(storage_path('app/public'));
  
      $this->info('Storage cleaned!');
  }
}
