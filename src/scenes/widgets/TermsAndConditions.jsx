import React, { useState } from 'react';

const TermsAndConditions = ({ isOpen, onClose }) => {
  const [showAllTerms, setShowAllTerms] = useState(false);

  if (!isOpen) return null;

  const terms = [
    {
      title: "Comptes Utilisateurs",
      content: "Les utilisateurs sont tenus de créer un compte pour accéder aux fonctionnalités de la plateforme. Les utilisateurs sont responsables de la confidentialité de leurs identifiants de compte et de toutes les activités effectuées sous leur compte."
    },
    {
      title: "Gestion des Dossiers Médicaux",
      content: "Les patients peuvent accéder à leurs dossiers médicaux, y compris les antécédents, diagnostics précédents et traitements. Ils peuvent mettre à jour leurs informations personnelles et médicales."
    },
    {
      title: "Prise de Rendez-vous",
      content: "Les patients peuvent prendre des rendez-vous avec des médecins spécifiques et recevoir des rappels de rendez-vous."
    },
    {
      title: "Communication avec les Médecins",
      content: "Les patients peuvent poser des questions aux médecins et recevoir des conseils médicaux via la plateforme."
    },
    {
      title: "Suivi des Médicaments",
      content: "Les patients peuvent recevoir des rappels pour prendre leurs médicaments et voir les interactions médicamenteuses potentielles."
    },
    {
      title: "Conduite de l'Utilisateur",
      content: "Les utilisateurs s'engagent à utiliser la plateforme en conformité avec toutes les lois et réglementations applicables. Les activités discriminatoires, harcelantes ou illégales sont strictement interdites. Medilink se réserve le droit de suspendre ou de résilier les comptes qui violent ces termes et conditions."
    },
    {
      title: "Propriété Intellectuelle",
      content: "Les utilisateurs conservent la propriété de leur propre contenu publié sur la plateforme. En publiant du contenu sur Medilink, les utilisateurs accordent à la plateforme une licence non exclusive pour afficher et distribuer le contenu."
    },
    {
      title: "Politique de Confidentialité",
      content: "Notre Politique de Confidentialité régit la collecte, l'utilisation et la divulgation des données des utilisateurs sur la plateforme. Les utilisateurs sont encouragés à consulter la Politique de Confidentialité pour comprendre comment leurs informations personnelles sont traitées."
    },
    {
      title: "Responsabilité et Déclarations",
      content: "Medilink n'est pas responsable des dommages ou pertes subis par les utilisateurs en lien avec l'utilisation de la plateforme. Nous ne garantissons pas l'exactitude ou la qualité des informations médicales fournies par les professionnels de santé."
    },
    {
      title: "Modification et Résiliation",
      content: "Medilink se réserve le droit de mettre à jour ces termes et conditions à tout moment sans préavis. Les utilisateurs peuvent résilier leur compte à tout moment en contactant le support client."
    },
    {
      title: "Loi Applicable et Résolution des Litiges",
      content: "Ces termes et conditions sont régis par les lois de [Juridiction]. Tout litige découlant de ou en relation avec ces termes et conditions sera résolu par arbitrage à [Juridiction]."
    },
  ];

  const renderedTerms = showAllTerms ? terms : terms.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full max-h-[80vh]">
        <h1 className="text-3xl font-bold text-center text-red-800 mb-6">Medilink - Termes et Conditions</h1>
        <div className="bg-gray-100 p-6 rounded shadow max-h-[50vh] overflow-y-auto">
          <ol className="list-decimal list-inside">
            {renderedTerms.map((term, index) => (
              <li key={index} className="mb-4">
                <strong>{term.title}</strong>
                <p>{term.content}</p>
              </li>
            ))}
          </ol>
        
          {!showAllTerms && (
            <button
              className="text-blue-500 underline"
              onClick={() => setShowAllTerms(true)}
            >
              Afficher Plus
            </button>
          )}
          <p className="mt-6">Si vous avez des questions ou des préoccupations concernant ces termes et conditions, veuillez nous contacter à <a href="mailto:medilink@support.com" className="text-blue-500">medilink@support.com</a>.</p>
        </div>
        <br />
        <div className="flex justify-center">
          <button className="bg-gray-300 text-black-800 px-4 py-2 rounded" onClick={onClose}>Accepter & Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
