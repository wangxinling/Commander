<?php

use CodeIgniter\Router\RouteCollection;
use App\Controllers\News;
use App\Controllers\Api\HistoryController;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('news', [News::class, 'index']);           // Add this line
$routes->get('news/(:segment)', [News::class, 'show']); // Add this line

// API Routes
$routes->group("api", ["namespace" => "App\Controllers\Api"], function ($routes) {
    $routes->get('history', [HistoryController::class, 'getAllHistory']);
    $routes->post('history', [HistoryController::class, 'addHistory']);
    $routes->delete('history/(:num)', [HistoryController::class, 'deleteHistory']);
});

// $routes->get('pages', [Pages::class, 'index']);
// $routes->get('(:segment)', [Pages::class, 'view']);