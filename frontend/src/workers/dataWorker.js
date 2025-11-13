function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function randChoice(arr) {
  return arr[randInt(0, arr.length - 1)];
}

const firstNames = ["John", "Amit", "Rahul", "Priya", "Kavya"];
const lastNames = ["Sharma", "Kumar", "Patel", "Verma", "Iyer"];

function genName() {
  return randChoice(firstNames) + " " + randChoice(lastNames);
}

let data = [];

onmessage = function (e) {
  const { type, payload } = e.data;

  if (type === "generate") {
    const count = payload.count;

    data = new Array(count);

    for (let i = 0; i < count; i++) {
      const name = genName();

      data[i] = {
        id: i + 1,
        name,
        phone: "+91" + (9600000000 + (i % 900000000)),
        email: name.toLowerCase().replace(" ", ".") + "@gmail.com",
        score: i % 100,
        lastMessageAt: new Date(Date.now() - i * 10000).toISOString(),
        addedBy: "Kartikey Mishra",
        avatar: name[0] + name.split(" ")[1][0],
      };
    }

    postMessage({
      type: "ready",
      payload: { indices: [...Array(count).keys()] },
    });
  }

  if (type === "query") {
    const q = payload.query.toLowerCase();
    const sortKey = payload.sortKey;
    const sortDir = payload.sortDir;

    let filtered = data;

    if (q) {
      filtered = data.filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.email.toLowerCase().includes(q) ||
          x.phone.includes(q)
      );
    }

    filtered.sort((a, b) => {
      let A = a[sortKey];
      let B = b[sortKey];

      if (typeof A === "string") {
        return sortDir === "asc"
          ? A.localeCompare(B)
          : B.localeCompare(A);
      }

      return sortDir === "asc" ? A - B : B - A;
    });

    postMessage({
      type: "result",
      payload: { indices: filtered.map((x) => x.id - 1) },
    });
  }

  if (type === "getRows") {
  const { from, indices } = payload;

  const limit = 30;
  const rows = [];

  for (let i = from; i < from + limit && i < indices.length; i++) {
    rows.push(data[indices[i]]);
  }

  postMessage({
    type: "rows",
    payload: { rows },
  });
}
};
