<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stage;
use App\Models\Document;
use App\Enums\StatutStage;
use Illuminate\Support\Facades\Storage;

class stageController extends Controller
{
    public function index(){
        return "OK";
    }

    public function new(Request $request){
        $data = $request->validate([
            'entreprise'=>'required|string',
            'debut'=> 'required|date_format:Y-m-d',
            'fin'=> 'required|date_format:Y-m-d|after_or_equal:start_date',
            'document'=> 'required|file|mimes:pdf,doc,docx|max:5120',
        ]);
        
        $stage = new Stage([
            'entreprise' => $request->entreprise,
            'debut'=> $request->debut,
            'fin'=> $request->fin,
            'statut' => StatutStage::EN_ATTENTE,
        ]);
        $stage->etudiant()->associate(auth()->user());
        $stage->save();

        $saved_file = $request->file('document')->store('stages','public');

        $document = new Document([
            'type_doc'=>'justif',
            'nom_fichier'=> $request->file('document')->getClientOriginalName(),
            'type_fichier' => $request->file('document')->extension(),
            'chemin_fichier' => $saved_file
        ]);
        $document->stage()->associate($stage);
        $document->save();

        
        return response()->json([
                'message' => "Created !",
            ], 200);
    }

    public function docs(Stage $stage){
        $doc = $stage->document;
    
        if ($doc){
            return response()->json($doc, 200);
        }

        return response()->json(["message"=>"no document"], 404); 
    
    }

    public function download(Stage $stage){
        return Storage::disk('public')->download($stage->document->chemin_fichier);
    }
}
