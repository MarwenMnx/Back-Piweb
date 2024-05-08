import pandas as pd
import random
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import dash
from dash import dcc, html
import plotly.graph_objs as go

# Générer des données aléatoires
donnees = {'Température (K)': [random.uniform(273, 373) for _ in range(150)],
           'Débit (m^3/s)': [random.uniform(0, 10) for _ in range(150)],
           'Pression (Pa)': [random.uniform(100000, 200000) for _ in range(150)],
           'Incendie': [random.choice([0, 1]) for _ in range(150)]}

# Créer un DataFrame à partir des données
df = pd.DataFrame(donnees)

# Filtrer les données pour ne conserver que celles où la température est supérieure à 300 K
df_filtre = df[df['Température (K)'] > 300]

# Enregistrer les données filtrées dans un fichier Excel
df_filtre.to_excel("donnees_incendie_filtre.xlsx", index=False)

print("Les données filtrées ont été enregistrées dans 'donnees_incendie_filtre.xlsx'")

# Charger les données filtrées depuis un fichier Excel (xlsx)
data = pd.read_excel("donnees_incendie_filtre.xlsx")

# Séparer les caractéristiques (features) et la variable cible (target)
X = data[['Température (K)', 'Débit (m^3/s)', 'Pression (Pa)']]  # Caractéristiques
y = data['Incendie']                                             # Variable cible

# Diviser les données en ensembles d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Créer un modèle d'arbre de décision
modele_arbre_decision = DecisionTreeClassifier()

# Ajuster le modèle sur les données d'entraînement
modele_arbre_decision.fit(X_train, y_train)

# Faire des prédictions sur les données de test
y_pred = modele_arbre_decision.predict(X_test)

# Calculer l'exactitude du modèle
accuracy = accuracy_score(y_test, y_pred)
print("Exactitude du modèle : {:.2f}%".format(accuracy * 100))

# Initialiser l'application Dash
app = dash.Dash(__name__)

# Créer le layout de l'application
app.layout = html.Div([
    html.H1("Dashboard d'analyse des données et de performance du modèle"),
    
    html.Div([
        html.H2("Informations sur le jeu de données"),
        html.P("Nombre total de données : {}".format(len(data))),
        html.P("Nombre de données pour l'incendie : {}".format(data['Incendie'].sum())),
        html.P("Nombre de données sans incendie : {}".format(len(data) - data['Incendie'].sum())),
    ]),

    html.Div([
        html.H2("Performance du modèle"),
        html.P("Exactitude du modèle : {:.2f}%".format(accuracy * 100)),
        dcc.Graph(
            id='confusion-matrix',
            figure={
                'data': [
                    go.Heatmap(z=confusion_matrix(y_test, y_pred),
                               x=['Non-incendie', 'Incendie'],
                               y=['Non-incendie', 'Incendie'],
                               colorscale='Viridis')
                ],
                'layout': {
                    'title': 'Matrice de confusion'
                }
            }
        )
    ]),
    
    html.Div([
        html.H2("Distribution des variables"),
        dcc.Graph(
            id='temperature-histogram',
            figure={
                'data': [
                    go.Histogram(x=data['Température (K)'], nbinsx=20, name='Température')
                ],
                'layout': {
                    'title': 'Distribution de la température',
                    'xaxis': {'title': 'Température (K)'},
                    'yaxis': {'title': 'Nombre de mole'}
                }
            }
        ),
        dcc.Graph(
            id='debit-histogram',
            figure={
                'data': [
                    go.Histogram(x=data['Débit (m^3/s)'], nbinsx=20, name='Débit')
                ],
                'layout': {
                    'title': 'Distribution du débit',
                    'xaxis': {'title': 'Débit (m^3/s)'},
                    'yaxis': {'title': 'Nombre de données'}
                }
            }
        ),
        dcc.Graph(
            id='pression-histogram',
            figure={
                'data': [
                    go.Histogram(x=data['Pression (Pa)'], nbinsx=20, name='Pression')
                ],
                'layout': {
                    'title': 'Distribution de la pression',
                    'xaxis': {'title': 'Pression (Pa)'},
                    'yaxis': {'title': 'Nombre de données'}
                }
            }
        )
    ])
])

# Lancer l'application
if __name__ == '__main__':
    app.run_server(debug=True)
