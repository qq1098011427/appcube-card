SmallScreenBase0010 = SmallScreenBase0010.extend(
{
    /*
     * Config to define Widget Properties
     */
    propertiesConfig: [
{
  "config": []
}
    ],

    /*
     * Triggered when the user Creates a new widget and used to initialize the widget properties
     */
    create: function(cbk)
    {
        if (cbk)
        {
            this._super();
            cbk();
        }
    }
});

var params = {};
params.hasMultipleItems = false;
params.hasAreaSpecificEvents = false;
Studio.registerWidget("SmallScreenBase0010", "~~~", params);
