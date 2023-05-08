using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class move : MonoBehaviour
{
    public GameObject gameObject;
    public Image mFlashImage;
    Vector3 destination = new Vector3(0f, 6.7f, 0.2f);
    public bool tr = true;
    public bool changed = false;
    public bool cam = false;
    public float flashSpeed = 5f;
    public Color flashColour = new Color(255f, 255f, 255f, 0.1f);
    public Color originColur = new Color(255f, 255f, 255f, 0f);
    public float timer;
    public int waitingTime = 10;
    string url = "http://localhost:8888/dev/ohtcheck/P4";
    public bool is_fitin;
    public bool is_go;
    private void Start()
    {
        mFlashImage = GameObject.Find("r").GetComponent<Image>();
    }
    private void Update()
    {
        if (changed)
        {
            mFlashImage.color = flashColour;
        }
        else
        {
            mFlashImage.color = Color.Lerp(mFlashImage.color, originColur, flashSpeed * Time.deltaTime);
        }
        changed = false;
    }
    void FixedUpdate()
    {
        if (is_fitin)
        {
            if (tr)
            {
                    if (gameObject.transform.position.x < -12.00f)
                    {
                        transform.position = Vector3.Lerp(transform.position, destination, 0.03f);
                    }
                    else if (gameObject.transform.position.x > -12.00f && gameObject.transform.position.x < -10f)
                    {
                        transform.rotation = Quaternion.Lerp(transform.rotation, Quaternion.Euler(new Vector3(0, -40f, 0)), 0.05f);
                        transform.position = Vector3.Lerp(transform.position, new Vector3(-9.5f, 6.7f, 1.7f), 0.02f);

                    }
                    else if (gameObject.transform.position.x > -10f && gameObject.transform.position.x < -3.9)
                    {
                        transform.rotation = Quaternion.Lerp(transform.rotation, Quaternion.Euler(new Vector3(0, 0, 0)), 0.05f);
                        transform.position = Vector3.Lerp(transform.position, new Vector3(-3.8f, 6.7f, 1.45f), 0.01f);

                    }
                    else if (gameObject.transform.position.x > -3.9)
                    {
                        tr = false;
                    }
                
            }
            else
            {
                timer += Time.deltaTime;

                if (timer > 3 && !cam)
                {
                    cam = true;
                    changed = true;
                    //StartCoroutine(UnityWebRequestGETTest());
                }
                if (timer > 6)
                {
                    transform.position = Vector3.Lerp(transform.position, new Vector3(4f, 6.7f, transform.position.z), 0.01f);
                    
                }
            }
        }
        else
        {
            transform.position = Vector3.Lerp(transform.position, new Vector3(4f, 6.7f, transform.position.z), 0.01f);
        }

        if (gameObject.transform.position.x > 3.8)
        {
            Destroy(this.gameObject);
        }
    }
    IEnumerator UnityWebRequestGETTest()
    {
        //
        List<IMultipartFormSection> files = new List<IMultipartFormSection>();
        files.Add(new MultipartFormFileSection
            (System.IO.File.ReadAllBytes(Application.dataPath + "/Resources/aug_1_inner_and_outer_8_11.jpg")));

        files.Add(new MultipartFormFileSection
            (System.IO.File.ReadAllBytes(Application.dataPath + "/Resources/aug_1_nothing_3.jpg")));

        files.Add(new MultipartFormFileSection
            (System.IO.File.ReadAllBytes(Application.dataPath + "/Resources/aug_2_only_inner_1_2.jpg")));

        files.Add(new MultipartFormFileSection
            (System.IO.File.ReadAllBytes(Application.dataPath + "/Resources/aug_3_only_inner_2_27.jpg")));
        UnityWebRequest www = UnityWebRequest.Post(url, files);
        www.SetRequestHeader("accesstoken", "eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjgyMzIzMTIzMDU1LCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM2MTkxMjMsInN1YiI6ImFjY2Vzcy10b2tlbiIsInJvbGUiOiJBRE1JTiJ9.czbc3p8q8Gv33TcrUCwkla8unotFvhrtbhtZS7vUwt4");
        yield return www.SendWebRequest();

        if (www.error == null)  // 에러가 나지 않으면 동작.
        {
            Debug.Log(www.downloadHandler.text);
        }
        else
        {
            Debug.Log("error");
        }
    }
}
