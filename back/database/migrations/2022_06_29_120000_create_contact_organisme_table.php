<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Contact;
use App\Models\Organisme;

class CreateContactOrganismeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_organisme', function (Blueprint $table) {
            $table->primary(['contact_id', 'organisme_id']);
            $table->foreignIdFor(Contact::class);
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
        Schema::dropIfExists('contact_organisme');
    }
}
