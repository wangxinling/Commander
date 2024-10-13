<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class History extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                "type" => "INT",
                "auto_increment" => true,
                "unsigned" => true
            ],
            "role" => [
                "type" => "VARCHAR",
                "constraint" => 50,
                "null" => false
            ],
            "content" => [
                "type" => "VARCHAR",
                "constraint" => 4096,
                "null" => false
            ],
            "timestamp datetime default current_timestamp"
        ]);

        $this->forge->addPrimaryKey("id");

        $this->forge->createTable("histories");
    }

    public function down()
    {
        $this->forge->dropTable("histories");
    }
}
