<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', 'Api\Auth\LoginController@login')->name('login');
Route::get('check-token-is-active', 'Api\Auth\LoginController@checkTokenIsActive')->name('check-token-active');
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('datas', 'Api\DataController@index')->name('datas');

Route::group(['middleware' => 'auth:api'], function(){
});
