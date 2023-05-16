<?php

namespace App\Http\Controllers;

use App\Models\GPT;
use App\Http\Requests\StoreGPTRequest;
use App\Http\Requests\UpdateGPTRequest;
use Illuminate\Http\Request;
use Orhanerday\OpenAi\OpenAi;
use Inertia\Inertia;

class GPTController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Gpt');
    }

    public function gptAnswer()
    {
        $fullChat = json_decode($_GET['chat'], true);
        $open_ai_key = env('OPENAI_API_KEY');
        $open_ai = new OpenAi($open_ai_key);

        $chat = $open_ai->chat([
            'model' => 'gpt-3.5-turbo',
            // 'model' => 'text-davinci-003',
            // 'messages' => [$chat[count($chat) - 1]],
            'messages' => $fullChat,
            // [
            //     [
            //         "role" => "system",
            //         "content" => "You are a helpful assistant."
            //     ],
            //     [
            //         "role" => "user",
            //         "content" => "Who won the world series in 2020?"
            //     ],
            //     [
            //         "role" => "assistant",
            //         "content" => "The Los Angeles Dodgers won the World Series in 2020."
            //     ],
            //     [
            //         "role" => "user",
            //         "content" => "Who are you?"
            //     ],
            // ],
            'temperature' => 1.0,
            'max_tokens' => 500,
            'frequency_penalty' => 0,
            'presence_penalty' => 0,
        ]);

        $answer = json_decode($chat);
        return [
            'answer' => $answer->choices[0]->message->content,
            'object' => $answer->object,
            'usage' => $answer->usage
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGPTRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(GPT $gPT)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GPT $gPT)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGPTRequest $request, GPT $gPT)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GPT $gPT)
    {
        //
    }
}
