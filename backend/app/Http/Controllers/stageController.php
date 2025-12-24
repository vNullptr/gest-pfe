<?php

namespace App\Http\Controllers;

use App\Enums\StatutEtudiant;
use Illuminate\Http\Request;
use App\Models\Stage;
use App\Models\Document;
use App\Enums\StatutStage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class stageController extends Controller
{
    public function index(){
        return "OK";
    }

    public function new(Request $request){

        if (auth()->user()->currentStage){
            return response()->json(["message"=>"internship in progress."],422);
        }

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
        auth()->user()->setAttribute('statut', StatutEtudiant::EN_ATTENTE);
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

        return response()->json(["message"=>"missing or wrong document"], 404); 
    
    }

    public function download(Stage $stage){
        return Storage::disk('public')->download($stage->document->chemin_fichier);
    }

    public function set_encadrant(Request $request, Stage $stage){
        $data = $request->validate( [
            "id_encadrant"=>"required|exists:users,id",
        ]);

        DB::transaction(function () use ($stage, $data) {
            $stage->id_encadrant = $data['id_encadrant'];
            $stage->statut = StatutStage::EN_COURS;
            $stage->save();

            $stage->etudiant->update([
                'statut' => StatutEtudiant::EN_STAGE,
            ]);
        });

        return response()->json(['message' => 'supervisor assigned']);
    }
}
