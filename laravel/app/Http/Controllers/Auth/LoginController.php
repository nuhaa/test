<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator, Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        # validate
        $validator = Validator::make($request->all(), User::loginValidation());
        if ($validator->fails()) {
            return response(['message'=>$validator->getMessageBag()->toArray()], 422);
        }
        # attempt
        if (!auth()->attempt($request->all())) {
            return response(['message' => 'Username / password tidak sesuai'], 422);
        }
        # token
        $token = auth()->user()->createToken('API Token')->accessToken;
        # response
        return response(['user' => auth()->user(), 'token' => $token]);
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
