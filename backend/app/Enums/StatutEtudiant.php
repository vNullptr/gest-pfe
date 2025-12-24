<?php

namespace App\Enums;

enum StatutEtudiant: int
{
    case NEUTRE = 0;
    case EN_ATTENTE = 1;
    case EN_STAGE = 2;
    case EN_CORRECTION = 3;
}
