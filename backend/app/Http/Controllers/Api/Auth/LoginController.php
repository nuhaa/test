<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator, Auth;
use GuzzleHttp\Client;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        # validate
        $validator = Validator::make($request->all(), User::loginValidation());
        if ($validator->fails()) {
            return response(['message'=>$validator->getMessageBag()->toArray()], 422);
        }
        try {
            # get login web tester
            $client = new Client(['headers' => ['Accept' => 'application/json']]); 
            $loginTester = $client->post('https://devel.bebasbayar.com/web/test_programmer.php',
                                        ['json' =>
                                            ['user'=>$request->username,'password'=>$request->password]
                                        ]);
            $loginTester = json_decode($loginTester->getBody()->getContents());
            $response = [
                'status' => $loginTester->rc,
                'message' => $loginTester->rd,
            ];
            # attempt
            if (!auth()->attempt($request->all())) {
                return response($response, 422);   
            }
            $token = Auth::user()->createToken('tester')->accessToken;
            // dd($token);
            # token
            if ($loginTester->rc == 00 and $token) {
                $response = array_merge($response, ['token'=>$token]);                
                return response($response, 200);
            } else {
                return response($response, 422);   
            }
        } catch (\Throwable $th) {
            $response = [
                'status'   => 'error',
                'message'   => $th->getMessage(),
            ];
            return response($response, 422);   
        }
        
    }

    public function checkTokenIsActive(Request $request)
    {
        if (Auth::guard('api')->check()) {
            return response(["message" => 'Sukses'],200);
        }
        $response = ["message" => "Tidak login"];
        return response($response,422);
    }
}
