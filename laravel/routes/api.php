<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', 'Auth\LoginController@login')->name('login');
Route::get('check-token-is-active', 'Auth\LoginController@checkTokenIsActive');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
