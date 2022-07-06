<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrganismeTypeorganismeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organisme_typeorganisme', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('organisme_id')->nullable();
            $table->foreignId('typeorganisme_id')->nullable();
            $table->boolean('archive')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('organisme_typeorganisme');
    }
}
