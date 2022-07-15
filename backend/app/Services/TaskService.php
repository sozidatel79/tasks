<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskService
{

    private $rules = [
        'title' => 'required',
        'date' => 'required',
        'completed' => 'required'
    ];

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|object
     */
    public function getAll(): \Illuminate\Http\Response {
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
    public function getOne(int $id): \Illuminate\Http\Response {
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|object
     */
    public function save(Request $request): \Illuminate\Http\Response {
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
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|object
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
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|object
     */
    public function delete(int $id): \Illuminate\Http\Response {
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
