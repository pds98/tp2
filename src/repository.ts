export {};

interface Entite
{
    id: number;
}

// extend t limite les contratines acceotes
class Repo<T extends Entite>
{
    private donnees = new Map<number, T>();
    ajouter(element: T): void

    {
        // à compléter
        this.donnees.set(element.id, element);
}

trouverParId(id: number): T | undefined
{
    return this.donnees.get(id);
     }
    tous(): T[]
    {
        return Array.from(this.donnees.values());
    }
    supprimer(id: number): boolean {
        return this.donnees.delete(id);
    }


    mettreAJour(id: number, changements: Partial<T>): void
    {
        // 1. chercher l'élément existant dans la Map
        const existant = this.donnees.get(id);

        // 2. s'il n'existe pas : throw new Error(...) avec l'id dans le message
        if (existant === undefined) {
            throw new Error(`Aucun element avec l'id ${id}`);
        }

        // 3. créer un NOUVEL objet : { ...existant, ...changements }
        const nouveau = { ...existant, ...changements };

        // 4. remettre ce nouvel objet dans la Map
        this.donnees.set(id, nouveau);
}

}
// ── Tests (ne pas modifier) ──
interface Produit extends Entite
{
    nom: string; prix: number;
}
const repo = new Repo<Produit>();
repo.ajouter({ id: 1, nom: 'Laptop', prix: 1200 });

repo.ajouter({ id: 2, nom: 'Souris', prix: 25 });

console.assert(repo.tous().length === 2, '2 produits');

console.assert(repo.trouverParId(1)?.nom === 'Laptop', 'trouve id 1');

console.assert(repo.trouverParId(99) === undefined, 'id 99 introuvable');

repo.mettreAJour(1,
    {
        prix: 1100 });

console.assert(repo.trouverParId(1)?.prix === 1100, 'prix mis à jour');

    console.assert(repo.supprimer(2) === true, 'suppression ok');

    console.assert(repo.tous().length === 1, '1 produit restant');

    try
    {
        repo.mettreAJour(99, { prix: 0 });

        console.assert(false, 'erreur attendue');
    }
    catch
    {
        /* attendu */
    }
    console.log('Exercice 2.4.2 terminé ');