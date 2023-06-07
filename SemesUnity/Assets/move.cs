using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class move : MonoBehaviour
{
    public GameObject gameObject;
    public GameObject doorL;
    public GameObject doorR;
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
    string url = "http://localhost:8888/dev/ohtcheck/unity";
    public bool is_fitin;
    public bool is_go;
    public bool is_StopDoor;
    private void Start()
    {
        mFlashImage = GameObject.Find("r").GetComponent<Image>();
        doorL = GameObject.Find("doorL").gameObject;
        doorR = GameObject.Find("doorR").gameObject;
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
                if (is_StopDoor)
                {
                    doorL.transform.rotation = Quaternion.Lerp(doorL.transform.rotation, Quaternion.Euler(new Vector3(0, 90, 0)), 0.05f);
                    doorL.transform.position = Vector3.Lerp(doorL.transform.position, new Vector3(-2.233f, 8.529f, 1.155f), 0.04f);

                    doorR.transform.rotation = Quaternion.Lerp(doorR.transform.rotation, Quaternion.Euler(new Vector3(0, 90, 0)), 0.05f);
                    doorR.transform.position = Vector3.Lerp(doorR.transform.position, new Vector3(-2.233f, 8.529f, 1.707f), 0.04f);
                }
                else
                {
                    doorL.transform.rotation = Quaternion.Lerp(doorL.transform.rotation, Quaternion.Euler(new Vector3(0, 180, 0)), 0.05f);
                    doorL.transform.position = Vector3.Lerp(doorL.transform.position, new Vector3(-2.233f, 8.529f, 0.876f), 0.04f);

                    doorR.transform.rotation = Quaternion.Lerp(doorR.transform.rotation, Quaternion.Euler(new Vector3(0, 0, 0)), 0.05f);
                    doorR.transform.position = Vector3.Lerp(doorR.transform.position, new Vector3(-2.233f, 8.529f, 1.958f), 0.04f);
                }
                timer += Time.deltaTime;

                if(timer < 3)
                {
                    is_StopDoor = true;
                }
                if (timer > 3 && !cam)
                {
                    cam = true;
                    changed = true;
                    StartCoroutine(UnityWebRequestGETTest());
                }
                if (timer > 4)
                {
                    is_StopDoor = false;
                    if (timer >6)
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

        UnityWebRequest www = UnityWebRequest.Get(url);
        www.SetRequestHeader("accesstoken", "eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjg0Mzc1ODc2Mzk5LCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODU2NzE4NzYsInN1YiI6ImFjY2Vzcy10b2tlbiIsInJvbGUiOiJBRE1JTiJ9.38DriSkMLPFOWS24RlNP6LDeU4RItWxPgZZORcqFZb0");
        yield return www.SendWebRequest();

        if (www.error == null)  // ������ ���� ������ ����.
        {
            Debug.Log(www.downloadHandler.text);
        }
        else
        {
            Debug.Log("error");
        }
    }
}
