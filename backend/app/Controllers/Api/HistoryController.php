<?php

namespace App\Controllers\Api;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use App\Models\HistoryModel;

class HistoryController extends ResourceController
{
    protected $modelName = "App\Models\HistoryModel";
    protected $format = "json";

    public function index()
    {
        //
    }
    public function getAllHistory()
    {
        $histories = $this->model->findAll();
        return $this->response->setJSON(['status' => 'success','message'=>'Get all histories', 'data' => $histories]);
    }
    // post method to add history
    public function addHistory()
    {
        $data = $this->request->getJSON(true);

        $role = isset($data['role']) ? $data['role'] : "";
        $content = isset($data['content']) ? $data['content'] : "";

        if(empty($role) || empty($content)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Missing required fields']);
        }
        if($this->model->insert($data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'History added successfully']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to add history']);
        }

    }
    // delete method to delete one message
    public function deleteHistory($message_id){
        
        $message = $this->model->find($message_id);

        if(!empty($message)){

            if($this->model->delete($message_id)){

                return $this->response->setJSON(['status' => 'success', 'message' => 'deleted the message']);
            }else{

                return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to delete the message']);
            }
        }else{

            return $this->response->setJSON(['status' => 'error', 'message' => 'the message id is invailded']);
        }
        
    }
}
