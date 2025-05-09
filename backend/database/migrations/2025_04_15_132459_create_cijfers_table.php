<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cijfers', function (Blueprint $table) {
            $table->id();
           $table->foreignId('leerling_id')->constrained('leerlingen');
             $table->foreignId('vak_id')->constrained('vakken');
             $table->foreignId('blok_id')->constrained('blokken');
            $table->foreignId('docent_id')->constrained('docenten');
            $table->decimal('cijfer' ,2,1);
            $table->date('datum');
            $table->timestamps();
        });
    }
 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cijfers');
    }
};
 