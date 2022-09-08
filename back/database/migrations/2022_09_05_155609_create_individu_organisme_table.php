<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Individu;
use App\Models\Organisme;

class CreateIndividuOrganismeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('individu_organisme', function (Blueprint $table) {
            $table->primary(['individu_id', 'organisme_id']);
            $table->foreignIdFor(Individu::class);
            $table->foreignIdFor(Organisme::class);
            $table->string('poste')->nullable();
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
        Schema::dropIfExists('individu_organisme');
    }
}
