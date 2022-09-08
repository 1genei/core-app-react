<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrganismesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organismes', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->nullable();           
            $table->string('email')->nullable();
            $table->string('site')->nullable();
            $table->string('adresse')->nullable();
            $table->string('complement_adresse')->nullable();            
            $table->string('numero_siret')->nullable();
            $table->string('numero_tva')->nullable();
            $table->string('iban')->nullable();
            $table->string('bic')->nullable();
            $table->string('code_postal')->nullable();
            $table->string('ville')->nullable();
            $table->string('pays')->nullable();
            $table->string('indicatif1')->nullable();
            $table->string('telephone1')->nullable();
            $table->string('indicatif2')->nullable();
            $table->string('telephone2')->nullable();
            $table->string('provence')->nullable();
            $table->string('region')->nullable();
            $table->string('etat')->nullable();
            $table->string('notes')->nullable();
            $table->boolean('archive')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('organismes');
    }
}
    