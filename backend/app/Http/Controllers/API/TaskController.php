<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{

    private $rules = [
        'title' => 'required',
        'date' => 'required',
        'completed' => 'required'
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): \Illuminate\Http\Response {

        $tasks = Task::all();

        if ( ! $tasks ) {
            return response([
                "code" => 404,
                "status" => "Not Found",
                "message" => "There are no tasks"
            ])->header("Content-type", "Application/json")->setStatusCode(404);
        }

        return response([
            "code" => 200,
            "status" => "OK",
            "data" => $tasks
        ])->header("Content-type", "Application/json")->setStatusCode(200);

    }

    /**
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|object
     */
    public function show(int $id)
    {
        $task = Task::find($id);

        if ( ! $task ) {
            return response([
                "code" => 404,
                "status" => "Not Found",
                "message" => "Task with ID ${id} not found"
            ])->header("Content-type", "Application/json")->setStatusCode(404);
        }
        return response([
            "code" => 200,
            "status" => "OK",
            "data" => $task
        ])->header("Content-type", "Application/json")->setStatusCode(200);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): \Illuminate\Http\Response {

        $validator = Validator::make($request->all(), $this->rules);

        if ( $validator->fails() ) {
            return response([
                "code" => 400,
                "status" => "Bad Request",
                "message" => "You missing some fields are required"
            ])->header("Content-type", "Application/json")->setStatusCode(400);
        } else {
            $created = Task::create([
                'title' => $request->request->get('title'),
                'completed' => $request->request->get('completed'),
                'date' => $request->request->get('date')
            ]);
            if ( ! $created ) {
                return response([
                    "code" => 400,
                    "status" => "Bad Request",
                    "message" => "Task creation failed"
                ])->header("Content-type", "Application/json")->setStatusCode(400);
            }
            return response([
                "code" => 200,
                "status" => "OK",
                "message" => "Task Created",
                "data" => $created
            ])->header("Content-type", "Application/json")->setStatusCode(200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id): \Illuminate\Http\Response {
        $validator = Validator::make($request->all(), $this->rules);

        if ( $validator->fails() ) {
            return response([
                "code" => 400,
                "status" => "Bad Request",
                "message" => "You missing some fields are required"
            ])->header("Content-type", "Application/json")->setStatusCode(400);
        } else {
            $updated = Task::find($id);
            if ( ! $updated ) {
                return response([
                    "code" => 404,
                    "status" => "Not found",
                    "message" => "Task with ID ${id} not found, nothing to update",
                ])->header("Content-type", "Application/json")->setStatusCode(404);
            }
            $updated->title = $request->request->get('title');
            $updated->date = $request->request->get('date');
            $updated->completed = $request->request->get('completed');
            $updated->save();
            return response([
                "code" => 200,
                "status" => "OK",
                "message" => "Task updated",
                "data" => $updated
            ])->header("Content-type", "Application/json")->setStatusCode(200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id): \Illuminate\Http\Response {
        $deleted = Task::find($id);
        if ( ! $deleted ) {
            return response([
                "code" => 404,
                "status" => "Not found",
                "message" => "Task with ID ${id} not found, nothing to delete",
            ])->header("Content-type", "Application/json")->setStatusCode(404);
        }
        $deleted->delete();

        return response([
            "code" => 200,
            "status" => "OK",
            "message" => "Task deleted",
            "data" => $deleted
        ])->header("Content-type", "Application/json")->setStatusCode(200);
    }

}
