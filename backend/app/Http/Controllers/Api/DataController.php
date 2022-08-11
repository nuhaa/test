<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class DataController extends Controller
{
    public function index()
    {
        $client = new Client(['headers' => ['Accept' => 'application/json']]); 
        $datas = $client->get('https://devel.bebasbayar.com/web/test_programmer.php');
        $datas = json_decode($datas->getBody()->getContents());
        return response(['datas'=>$datas], 200);  
    }
}
