import joblib
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score, mean_absolute_error
from sklearn.model_selection import train_test_split, cross_val_score

from ml.features import build_training_dataframe


def train_model():

    df = build_training_dataframe()

    # Encode categorical
    le_source = LabelEncoder()
    le_destination = LabelEncoder()

    df["source"] = le_source.fit_transform(df["source"])
    df["destination"] = le_destination.fit_transform(df["destination"])

    X = df[
        [
            "source",
            "destination",
            "base_price",
            "days_to_departure",
            "booking_count",
            "historical_avg_price"
        ]
    ]

    y = df["price_paid"]

    # Split data properly
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestRegressor(
        n_estimators=200,
        max_depth=12,
        random_state=42
    )

    model.fit(X_train, y_train)

    # Predictions
    train_preds = model.predict(X_train)
    test_preds = model.predict(X_test)

    # Metrics
    print("\n----- TRAIN METRICS -----")
    print("R2:", r2_score(y_train, train_preds))
    print("MAE:", mean_absolute_error(y_train, train_preds))

    print("\n----- TEST METRICS -----")
    print("R2:", r2_score(y_test, test_preds))
    print("MAE:", mean_absolute_error(y_test, test_preds))

    # Cross validation
    cv_scores = cross_val_score(model, X, y, cv=5, scoring="r2")
    print("\n----- CROSS VALIDATION R2 -----")
    print("Mean CV R2:", np.mean(cv_scores))

    # Feature importance
    print("\n----- FEATURE IMPORTANCE -----")
    for name, importance in zip(X.columns, model.feature_importances_):
        print(f"{name}: {importance:.4f}")

    # Save model + encoders
    joblib.dump(model, "ml/price_model.pkl")
    joblib.dump(le_source, "ml/source_encoder.pkl")
    joblib.dump(le_destination, "ml/destination_encoder.pkl")

    print("\nModel trained and saved successfully.")