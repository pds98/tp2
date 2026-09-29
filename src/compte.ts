export {};
class CompteBancaire{
    private solde: number;
    readonly numero: string;
    static nbComptes = 0;
    constructor(numero: string, soldeInitial = 0)
    {
        this.numero = numero;
        this.solde = soldeInitial;
        CompteBancaire.nbComptes++;
        }


        deposer(montant: number): void
        {
            if (montant <= 0) {
                throw new Error('Le montant doit >0 ');
            }
            this.solde += montant;
        }


    retirer(montant: number): void
    {

        if (montant <= 0)
        {
            throw new Error('Le montant du retrait doit etre superieur a 0');

        }
        if (montant > this.solde)
        {
            throw new Error('Solde inferieur au montant qu on veut retirer');
        }
        this.solde -= montant;
    }


    get soldeActuel(): number
    {
        return this.solde;
    }



    transferer(destination: CompteBancaire, montant: number): void

    {
        this.retirer(montant);
        destination.deposer(montant);
    }



}
// ── Tests (ne pas modifier) ──
const c1 = new CompteBancaire('A-100', 500);
const c2 = new CompteBancaire('B-200'); c1.deposer(200);
console.assert(c1.soldeActuel === 700, '700 après dépôt');
c1.retirer(150); console.assert(c1.soldeActuel === 550, '550 après retrait');
console.assert(c2.soldeActuel === 0, 'solde initial = 0');
console.assert(CompteBancaire.nbComptes === 2, '2 comptes créés');
try { c1.retirer(9999);
    console.assert(false, 'devrait lever une erreur'); }
catch { /* erreur attendue */ }
try { c1.deposer(0);
    console.assert(false, 'devrait lever une erreur'); }
catch { /* erreur attendue */ }
console.log('Exercice 2.4.1 terminé ');



//c1.solde = 1000000;
//c1.numero = 'Z-999';
//c1.soldeActuel = 5;
//c1.soldeActuel();
