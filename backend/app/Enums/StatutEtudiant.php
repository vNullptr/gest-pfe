<?php

namespace App\Enums;

enum StatutEtudiant: int
{
    case A_LA_RECHERCHE = 0;
    case EN_STAGE = 1;
    case EN_ATTENTE = 2;
    case EN_SOUTENANCE = 3;
    case TERMINE = 4;
}
