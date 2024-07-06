

if (sap.n) {
    sap.n.Planet9.function({
        id: "AuditLog",
        method: "Save",
        data: {
            dateStart: Date.now(),
            dateEnd: Date.now(),
            changedBy: "System",
            content: JSON.stringify({ name: "shiftmanager" }),
            objectKey: "083162b8-3e1d-490e-8643-2d2cdc2ecffd",
            objectName: "Table",
            objectType: "sap.m.Table",
            action: "Interaction"
        },
        success: function(data) {
            // Handle success
        },
        error: function(data) {
            // Handle error
        }
    });
};