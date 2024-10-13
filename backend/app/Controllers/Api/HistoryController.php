<?php

namespace App\Controllers\Api;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use App\Models\HistoryModel;

class HistoryController extends ResourceController
{
    protected $modelName = "App\Models\HistoryModel";

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
        $data = $this->request->getPost();

        $user = isset($data['user']) ? $data['name'] : "";
        $content = isset($data['content']) ? $data['email'] : "";

        if(empty($user) || empty($content)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Missing required fields']);
        }
        if($this->model->insert($data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'History added successfully']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to add history']);
        }

    }
    // delete method to delete all history
    public function deleteHistory(){
        this->model->purgeDeleted();
        return $this->response->setJSON(['status' => 'success', 'message' => 'All history deleted successfully']);
    }
}
