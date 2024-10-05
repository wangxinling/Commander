<?php

namespace App\Controllers;

use CodeIgniter\controller;
use App\Models\CommandersModel;

class CommanderList extends BaseController
{

    public function index()
    {
        $model = new CommandersModel();

        $data['commanderList'] = $model->getCommanders();
        $data['title'] = 'Commander List';

        return view('welcome_message');
  
    }

}