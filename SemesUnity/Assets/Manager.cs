using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Manager : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyUp(KeyCode.A))
        {
            GameObject oht = (GameObject)Instantiate(Resources.Load("oht_model"));
            oht.transform.position = new Vector3(-22.94f, 6.7f, 0.2f);
            move m = oht.GetComponent<move>();
            m.is_fitin = false;
        }
        else if (Input.GetKeyUp(KeyCode.D))
        {
            GameObject oht = (GameObject)Instantiate(Resources.Load("oht_model"));
            oht.transform.position = new Vector3(-22.94f, 6.7f, 0.2f);
            move m = oht.GetComponent<move>();
            m.is_fitin = true;
        }
    }
}
